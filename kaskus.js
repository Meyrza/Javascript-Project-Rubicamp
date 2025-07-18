function deretKaskus(num) {
  let print = []
  for (let i = 1; i <= num; i++) {
    let angka = i * 3
    print.push(
      angka % 5 == 0 ? "KAS" :
      angka % 6 == 0 ? "KUS" :
      angka % 6 == 0 && angka % 5 == 0 ? "KASKUS" :
      angka
    )
  }
  return print
}
console.log(deretKaskus(15))