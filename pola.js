const pola = (str) => {
  for (let satu = 0; satu <= 9; satu++) {
    for (let dua = 0; dua <= 9; dua++) {
      const potong = str
        .replace('#', satu)
        .replace('#', dua)
      const [left, right] = potong.split('=')
    if (eval(left) === Number(right)) 
    return [satu, dua];
    }
  }
  return null
}

console.log(pola('42#3 * 188 = 80#204'))
// buat agar hasiloutput [8, 5]
console.log(pola('8#61 * 895 = 78410#5'))
// hasil yg keluar [7,9]