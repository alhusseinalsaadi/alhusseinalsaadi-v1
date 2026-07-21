// Process markdown content to add better styling
export function enhanceMarkdownHTML(html: string): string {
  return html
    // H2 Headers - مع حد سفلي ذهبي
    .replace(/<h2/g, '<h2 id="section" style="font-family: \'Noto Kufi Arabic\', serif; font-size: 28px; font-weight: 700; color: #1A2744; margin: 48px 0 20px; padding-bottom: 16px; border-bottom: 3px solid #C9A84C; position: relative;"')
    .replace(/<\/h2>/g, '</h2>')

    // H3 Headers - أصغر قليلاً
    .replace(/<h3/g, '<h3 style="font-family: \'Noto Kufi Arabic\', serif; font-size: 22px; font-weight: 700; color: #2D3E5F; margin: 32px 0 16px; display: flex; align-items: center; gap: 12px;"')
    .replace(/<\/h3>/g, '</h3>')

    // Paragraphs - محسّنة
    .replace(/<p/g, '<p style="margin: 16px 0; text-align: justify; line-height: 1.9; color: #333;"')
    .replace(/<\/p>/g, '</p>')

    // Links - مع ألوان
    .replace(/<a/g, '<a style="color: #C9A84C; text-decoration: underline; font-weight: 600; transition: all 0.2s; cursor: pointer;" target="_blank" rel="noopener noreferrer"')
    .replace(/<\/a>/g, '</a>')

    // Lists - محسّنة
    .replace(/<li/g, '<li style="margin: 10px 0; padding-right: 20px; text-align: justify; line-height: 1.8; color: #333;"')
    .replace(/<\/li>/g, '</li>')
    .replace(/<ul/g, '<ul style="margin: 16px 0; padding-right: 24px; list-style-type: disc;"')
    .replace(/<\/ul>/g, '</ul>')
    .replace(/<ol/g, '<ol style="margin: 16px 0; padding-right: 24px; list-style-type: decimal;"')
    .replace(/<\/ol>/g, '</ol>')

    // Blockquotes - لـ الاقتباسات
    .replace(/<blockquote/g, '<blockquote style="border-right: 4px solid #C9A84C; background: #F9F7F4; padding: 20px 24px; margin: 24px 0; border-radius: 8px; font-style: italic; color: #555; line-height: 1.8;"')
    .replace(/<\/blockquote>/g, '</blockquote>')

    // Tables - محسّنة
    .replace(/<table/g, '<table style="width: 100%; border-collapse: collapse; margin: 24px 0; border: 1px solid #E5E5E0;"')
    .replace(/<\/table>/g, '</table>')
    .replace(/<td/g, '<td style="border: 1px solid #E5E5E0; padding: 12px; text-align: right; color: #333;"')
    .replace(/<th/g, '<th style="border: 1px solid #C9A84C; padding: 12px; text-align: right; background: linear-gradient(135deg, #F9F7F4 0%, #F0EDE6 100%); font-weight: 700; color: #1A2744;"')
    .replace(/<\/td>/g, '</td>')
    .replace(/<\/th>/g, '</th>')

    // Strong (bold) - مع لون
    .replace(/<strong/g, '<strong style="color: #1A2744; font-weight: 700;"')
    .replace(/<\/strong>/g, '</strong>')

    // Emphasis (italic)
    .replace(/<em/g, '<em style="color: #2D3E5F; font-style: italic;"')
    .replace(/<\/em>/g, '</em>');
}
