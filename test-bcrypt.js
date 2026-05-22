const b = require('./node_modules/bcryptjs');
const h = process.env.ADMIN_PASSWORD_HASH;
const e = process.env.ADMIN_EMAIL;
const p = 'SaadiLaw2026';
console.log('ADMIN_EMAIL:', JSON.stringify(e));
console.log('HASH:', JSON.stringify(h));
console.log('HASH_LEN:', h ? h.length : 'MISSING');
console.log('email_match:', e && e.toLowerCase() === 'admin@alhawjan.com'.toLowerCase());
b.compare(p, h).then(r => console.log('bcrypt_match:', r));
