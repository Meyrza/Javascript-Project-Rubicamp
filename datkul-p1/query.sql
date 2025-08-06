-- Tabel Jurusan
CREATE TABLE jurusan (
    id_jurusan VARCHAR(4) PRIMARY KEY,
    nama_jurusan VARCHAR(50) NOT NULL
);

-- Tabel Mahasiswa
CREATE TABLE mahasiswa (
  nim VARCHAR(4) PRIMARY KEY,
  nama VARCHAR(50),
  alamat TEXT,
  tgl_lahir TEXT,
  id_jurusan VARCHAR(4),
  FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan)
);

-- Tabel Dosen
CREATE TABLE dosen (
    id_dosen VARCHAR(4) PRIMARY KEY,
    nama VARCHAR(50) NOT NULL
);

-- Tabel Matakuliah
CREATE TABLE matakuliah (
    id_matkul VARCHAR(4) PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    sks INTEGER,
    id_dosen VARCHAR(4),
    FOREIGN KEY (id_dosen) REFERENCES dosen(id_dosen)
);

-- Tabel Nilai
CREATE TABLE nilai (
    id_nilai VARCHAR(4) PRIMARY KEY,
    nim VARCHAR(4),
    id_matkul VARCHAR(4),
    nilai VARCHAR,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (id_matkul) REFERENCES matakuliah(id_matkul)
);

-- Jurusan
INSERT INTO jurusan (id_jurusan, nama_jurusan) VALUES
('J01', 'Teknik Informatika'),
('J02', 'Sistem Informasi'),
('J03', 'Manajemen');


-- Dosen
INSERT INTO dosen (id_dosen, nama) VALUES
('D01', 'Budi Santoso'),
('D02', 'Ani Lestari'),
('D03', 'Rudi Hartono');

-- Mahasiswa
INSERT INTO mahasiswa (nim, nama, alamat, tgl_lahir, id_jurusan) VALUES
('M001', 'Andi', 'Jakarta', '2008-05-10', 'J01'),
('M002', 'Budi', 'Bandung', '2002-08-15', 'J02'),
('M003', 'Citra', 'Surabaya', '2004-03-20', 'J03'),
('M004', 'Dewi', 'Depok', '2001-12-05', 'J02'),
('M005', 'Rani', 'Bogor', '2007-10-15', 'J01');

-- Matakuliah
INSERT INTO matakuliah (id_matkul, nama, sks, id_dosen) VALUES
('MK1', 'Basis Data', 3, 'D01'),
('MK2', 'Pemrograman', 4, 'D02'),
('MK3', 'Manajemen Proyek', 2, 'D03');

-- Nilai
INSERT INTO nilai (id_nilai, nim, id_matkul, nilai) VALUES
('N01', 'M001', 'MK1', 'A'),
('N02', 'M001', 'MK2', 'B'),
('N03', 'M001', 'MK3', 'A'),
('N04', 'M001', 'MK2', 'A'),
('N05', 'M002', 'MK1', 'B'),
('N06', 'M002', 'MK2', 'A'),
('N08', 'M004', 'MK3', 'C'),
('N09', 'M003', 'MK2', 'B'),
('N10', 'M003', 'MK2', 'C'),
('N11', 'M004', 'MK3', 'E');

-- no.1
SELECT 
  m.*, 
  j.nama_jurusan
FROM mahasiswa m
JOIN jurusan j ON m.id_jurusan = j.id_jurusan;
-- no.2
SELECT 
  nim, 
  nama, 
  tgl_lahir,
  CAST(strftime('%Y', 'now') AS INTEGER) - CAST(strftime('%Y', tgl_lahir) AS INTEGER) AS umur
FROM mahasiswa
WHERE CAST(strftime('%Y', 'now') AS INTEGER) - CAST(strftime('%Y', tgl_lahir) AS INTEGER) < 20;
-- no.3
SELECT DISTINCT
  m.nim,
  m.nama
FROM nilai n
JOIN mahasiswa m ON n.nim = m.nim
WHERE n.nilai IN ('A', 'B');
-- no.4
SELECT 
  m.nim, 
  m.nama, 
  SUM(mk.sks) AS total_sks
FROM nilai n
JOIN mahasiswa m ON n.nim = m.nim
JOIN matakuliah mk ON n.id_matkul = mk.id_matkul
GROUP BY m.nim, m.nama
HAVING total_sks > 10;
-- no.5
SELECT 
  m.nim, 
  m.nama, 
  mk.nama AS nama_matkul
FROM nilai n
JOIN mahasiswa m ON n.nim = m.nim
JOIN matakuliah mk ON n.id_matkul = mk.id_matkul
WHERE LOWER(mk.nama) = 'basis data';
-- no.6
SELECT 
  d.nama AS nama_dosen,
  COUNT(DISTINCT n.nim) AS jumlah_mahasiswa
FROM nilai n
JOIN matakuliah mk ON n.id_matkul = mk.id_matkul
JOIN dosen d ON mk.id_dosen = d.id_dosen
GROUP BY d.nama;
-- no.7
SELECT 
  nim, 
  nama, 
  tgl_lahir,
  CAST(strftime('%Y', '2025-01-01') AS INTEGER) - CAST(strftime('%Y', tgl_lahir) AS INTEGER) AS umur
FROM mahasiswa
ORDER BY umur DESC;
-- no.8
SELECT
  m.nim,
  m.nama AS nama_mahasiswa,
  j.nama_jurusan,
  mk.nama AS nama_matkul,
  d.nama AS nama_dosen,
  n.nilai
FROM nilai n
JOIN mahasiswa m ON n.nim = m.nim
JOIN jurusan j ON m.id_jurusan = j.id_jurusan
JOIN matakuliah mk ON n.id_matkul = mk.id_matkul
JOIN dosen d ON mk.id_dosen = d.id_dosen
WHERE n.nilai IN ('D', 'E');