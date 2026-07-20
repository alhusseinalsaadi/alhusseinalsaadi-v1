// Quick script to generate remaining articles 11-30
const articles = [
  {
    num: 11,
    title: "محامي طلاق جدة - استشارات متخصصة في قضايا الطلاق",
    slug: "divorce-lawyer-jeddah",
    keyword: "محامي طلاق جدة"
  },
  {
    num: 12,
    title: "محامي حضانة جدة - حماية حقوق أطفالك القانونية",
    slug: "custody-lawyer-jeddah",
    keyword: "محامي حضانة جدة"
  },
  {
    num: 13,
    title: "محامي نفقة جدة - استحقاقاتك المالية من الأب",
    slug: "alimony-lawyer-jeddah",
    keyword: "محامي نفقة جدة"
  },
  {
    num: 14,
    title: "محامي مخدرات جدة - الدفاع القانوني في قضايا المخدرات",
    slug: "drugs-lawyer-jeddah",
    keyword: "محامي مخدرات جدة"
  },
  {
    num: 15,
    title: "محامي قضايا مالية جدة - حل القضايا المالية المعقدة",
    slug: "financial-cases-jeddah",
    keyword: "محامي قضايا مالية جدة"
  }
];

console.log("Articles to create:", articles.length);
articles.forEach(a => console.log(`${a.num}: ${a.title}`));
