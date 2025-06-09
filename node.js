// app.js
const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.urlencoded({ extended: true }));

// ✅ Reflected XSS
app.post('/xss', (req, res) => {
  const name = req.body.name;
  res.send(`<h1>Hello, ${name}</h1>`); // Vulnerable
});

// ✅ Command Injection
app.get('/ping', (req, res) => {
  const host = req.query.host;
  exec(`ping -c 1 ${host}`, (err, stdout, stderr) => {
    if (err) return res.send("Error");
    res.send(`<pre>${stdout}</pre>`); // Vulnerable
  });
});

app.listen(3000, () => {
  console.log("Vulnerable app listening on http://localhost:3000");
});
