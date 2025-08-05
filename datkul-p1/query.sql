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
('M004', 'Dewi', 'Depok', '2001-12-05', 'J04'),
('M005', 'Rani', 'Bogor', '2007-10-15', 'J01');

-- Matakuliah
INSERT INTO matakuliah (id_matkul, nama, sks, id_dosen) VALUES
('MK1', 'Basis Data', 3, 'D01'),
('MK2', 'Pemrograman', 4, 'D02'),
('MK3', 'Manajemen Proyek', 2, 'D03');

-- Nilai
INSERT INTO nilai (id_nilai, nim, id_matkul, nilai) VALUES
('N01', 'M01', 'MK1', 'B'),
('N02', 'M01', 'MK2', 'A'),
('N03', 'M02', 'MK3', 'B'),
('N04', 'M03', 'MK1', 'B'),
('N05', 'M03', 'MK2', 'E'),
('N06', 'M04', 'MK3', 'C');