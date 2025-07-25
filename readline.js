const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function stringManipulation(word) {
  return 'aiueoAIUEO'.includes(word[0])
    ? word
    : word.slice(1) + word[0] + 'nyo';
}

function tanya() {
  rl.question('Tulis kecap naon wae : ', (input) => {
    if (input.toLowerCase() === 'beres') {
      rl.close();
    } else {
      console.log('Hasilna:', stringManipulation(input));
      tanya();
    }
  });
}

tanya();
