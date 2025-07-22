function stringManipulation(word) {
  let vokal = 'aiueoAIUEO';
  if (vokal.includes(word[0])) {
    return word;
  } else {
    return word.slice(1) + word[0] + 'nyo';
  }
}

console.log(stringManipulation('ayam'));   // "ayam"
console.log(stringManipulation('bebek'));  // "ebekbnyo"
