const fs = require('fs');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
let i = 0;

console.log('Tebak Kata dimulai!\n');

(function tanya() {
  if (i === data.length) return rl.close(console.log('Hore, beres!'));

  rl.question(`${data[i].definition}\nJawaban: `, j => {
    console.log(j.trim().toLowerCase() === data[i].term.toLowerCase() ? 'Benar!\n' : 'Salah!\n');
    if (j.trim().toLowerCase() === data[i].term.toLowerCase()) i++;
    tanya();
  });
})();
