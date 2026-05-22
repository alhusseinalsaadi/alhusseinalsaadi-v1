const http = require('http');
const data = JSON.stringify({email:'admin@alhawjan.com',password:'SaadiLaw2026'});
const req = http.request({
  hostname:'localhost', port:3000, path:'/api/auth', method:'POST',
  headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}
}, res => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
});
req.write(data);
req.end();
