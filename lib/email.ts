import { prisma } from "./db";

interface EmailOptions {
  to: string;
  subject: string;
  title: string;
  message: string;
  type: "lead" | "appointment" | "message" | "system";
  link?: string;
  metadata?: Record<string, any>;
}

export async function sendNotification(options: EmailOptions) {
  const { to, subject, title, message, type, link, metadata } = options;

  try {
    // Store notification in database
    const notification = await prisma.notification.create({
      data: {
        type,
        title,
        message,
        email: to,
        link,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    });

    // Try to send email (optional, requires external service)
    await sendEmail(to, subject, title, message, link);

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

async function sendEmail(to: string, subject: string, title: string, message: string, link?: string) {
  // For now, this is a placeholder
  // In production, integrate with SendGrid, Mailgun, or AWS SES
  // Or use a Node.js email library like nodemailer

  const smtpUrl = process.env.SMTP_URL;
  const fromEmail = process.env.SMTP_FROM || "noreply@alhusseinalsaadi.sa";

  if (!smtpUrl) {
    console.warn("SMTP_URL not configured, skipping email sending");
    return;
  }

  try {
    // This is a placeholder for actual email sending
    console.log(`[EMAIL] To: ${to}, Subject: ${subject}`);
  } catch (error) {
    console.error("Error sending email:", error);
    // Don't throw - notifications should work even if email fails
  }
}

export async function createLeadNotification(leadName: string, phone: string, service: string) {
  const adminEmails = await prisma.adminUser.findMany({
    where: { active: true },
    select: { email: true },
  });

  for (const admin of adminEmails) {
    await sendNotification({
      to: admin.email,
      subject: `استشارة جديدة من ${leadName}`,
      title: "استشارة قانونية جديدة",
      message: `تلقيت استشارة جديدة من ${leadName} (${phone}) بخصوص ${service}`,
      type: "lead",
      link: "/admin/leads",
    });
  }
}

export async function createAppointmentNotification(appointmentDate: string, appointmentTime: string, clientName: string) {
  const adminEmails = await prisma.adminUser.findMany({
    where: { active: true },
    select: { email: true },
  });

  for (const admin of adminEmails) {
    await sendNotification({
      to: admin.email,
      subject: `موعد جديد في ${appointmentDate}`,
      title: "موعد استشارة محجوز",
      message: `تم حجز موعد استشارة للعميل ${clientName} في ${appointmentDate} الساعة ${appointmentTime}`,
      type: "appointment",
      link: "/admin/appointments",
    });
  }
}
