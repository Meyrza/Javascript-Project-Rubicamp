const fs = require('fs');
const readline = require('readline');

const fileName = process.argv[2];
if (!fileName) {
  console.log("Tolong sertakan nama file sebagai inputan soalnya\nMisalnya 'node solution.js data.json'");
  process.exit(1);
}

let questions = JSON.parse(fs.readFileSync(fileName));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let i = 0;
let skipped = [];

console.log(`Selamat datang di permainan Tebak-tebakan dari file '${fileName}'!\nKetik 'skip' untuk melewati pertanyaan.\n`);

function ask() {
  if (i >= questions.length) {
    if (skipped.length) {
      questions = skipped;
      skipped = [];
      i = 0;
      return ask();
    }
    console.log("\nAnda Berhasil!");
    return rl.close();
  }

  let wrong = 0; // Kesalahan hanya untuk soal saat ini

  function promptQuestion() {
    rl.question(`Pertanyaan: ${questions[i].question}\nJawaban: `, (jawab) => {
      if (jawab.toLowerCase() === questions[i].answer.toLowerCase()) {
        console.log("Anda Beruntung!\n");
        i++;
        ask(); // Lanjut ke soal berikutnya
      } else if (jawab.toLowerCase() === 'skip') {
        skipped.push(questions[i++]);
        ask(); // Lanjut ke soal berikutnya
      } else {
        wrong++;
        console.log(`Anda Kurang Beruntung! Anda telah salah ${wrong} kali untuk soal ini, silakan coba lagi.`);
        promptQuestion(); // Tetap di soal yang sama
      }
    });
  }

  promptQuestion();
}

ask();
