function indexPrime(n) {
  var count = 0, num = 1;
  // si count buat liat udah ketemu berapa bilangan primanya
  // si num adalah angka yang akan dicetak

  while (count < n) { // bakal looping sampai ketemu bilangan si (n)
    num++; // si num ditambah 1
    var prime = true; 

    for (let i = 2; i < num; i++) { // cek ada ga yang bisa bagi si num sampai habis
      if (num % i === 0) { // kalo si num bisa dibagi habis sama i berarti bukan bilangan prima
        prime = false;
        break;
      }
    }
    if (prime) count++; // kalo si num prima countnya tambah satu
  }

  return num; // kalau count sudah sama dengan n maka keluar dari loopnya
}

console.log(indexPrime(4));      // 7
console.log(indexPrime(500));    // 3571
console.log(indexPrime(37786));  // 450881
