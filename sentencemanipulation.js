function sentencesManipulation(sentence) {
  let words = sentence.split(' ');
  let result = [];

  for (let i = 0; i < words.length; i++) {
    let w = words[i];
    let first = w[0];

    if ('aiueoAIUEO'.includes(first)) {
      result.push(w);
    } else {
      result.push(w.slice(1) + first + 'nyo');
    }
  }

  return result.join(' ');
}

console.log(sentencesManipulation('ibu pergi ke pasar bersama aku'));
// Output: 'ibu erginyo eknyo asarpnyo ersamabnyo aku'
