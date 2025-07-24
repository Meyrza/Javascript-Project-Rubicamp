function spiral(n) {
  let num = 0
  const matrix = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => num++)
  )

  const result = []
  let atas = 0, bawah = n - 1
  let kiri = 0, kanan = n - 1

  while (atas <= bawah && kiri <= kanan) {
    for (let i = kiri; i <= kanan; i++) result.push(matrix[atas][i])
    atas++

    for (let i = atas; i <= bawah; i++) result.push(matrix[i][kanan])
    kanan--

    if (atas <= bawah)
      for (let i = kanan; i >= kiri; i--) result.push(matrix[bawah][i])
    bawah--

    if (kiri <= kanan)
      for (let i = bawah; i >= atas; i--) result.push(matrix[i][kiri])
    kiri++
  }

  console.log(result)
}

spiral(5)
spiral(6)
spiral(7)