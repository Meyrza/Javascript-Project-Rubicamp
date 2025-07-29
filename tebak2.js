const fs = require('fs');
const readline = require('readline');

const fileName = process.argv[2];
if (!fileName) {
  console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
  process.exit(1);
}

let questions = JSON.parse(fs.readFileSync(fileName));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let i = 0, wrong = 0, skipped = [];

console.log(`Selamat datang di permainan Tebak-tebakan dari file '${fileName}'!\nKetik 'skip' untuk melewati pertanyaan.\n`);

function ask() {
  if (i >= questions.length) {
    if (skipped.length) {
      questions = skipped;
      skipped = [];
      i = 0;
      wrong = 0;
      return ask();
    }
    console.log("\nAnda Berhasil!");
    return rl.close();
  }

  rl.question(`Pertanyaan: ${questions[i].question}\nJawaban: `, (jawab) => {
    if (jawab.toLowerCase() === questions[i].answer.toLowerCase()) {
      console.log("Anda Beruntung!\n");
      i++;
    } else if (jawab.toLowerCase() === 'skip') {
      skipped.push(questions[i++]);
    } else {
      wrong++;
      console.log(`Anda Kurang Beruntung! anda telah salah ${wrong} kali, silahkan coba lagi.`);
    }
    ask();
  });
}

ask();
