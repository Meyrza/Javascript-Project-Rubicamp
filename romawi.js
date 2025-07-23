function romawi(gantiromawi) {
  const angka =  [1000, 900, 500, 400, 100, 90,  50, 40, 10, 9, 5, 4, 1];
  const simbol = ["M",  "CM", "D", "CD", "C", "XC", "L", "XL","X","IX","V","IV","I"];
  let hasil = "";

  angka.forEach((nilai, index) => {
    while (gantiromawi >= nilai) {
      hasil += simbol[index];
      gantiromawi -= nilai;
    }
    
  });

  return hasil;
}

console.log('Script testing untuk konversi Romawi\n')
console.log('input | expected | result')
console.log('------|----------|-------')
console.log('4     | IV       | ', romawi(4))
console.log('9     | IX       | ', romawi(9))
console.log('13    | XIII     | ', romawi(13))
console.log('1435  | MCDLIII  | ', romawi(1435))
console.log('1645  | MDCXLVI  | ', romawi(1645))

