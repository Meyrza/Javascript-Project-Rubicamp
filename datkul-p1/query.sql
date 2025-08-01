-- Tabel Jurusan
CREATE TABLE jurusan (
    id_jurusan VARCHAR(4) PRIMARY KEY,
    nama_jurusan VARCHAR(50) NOT NULL
);

-- Tabel Mahasiswa
CREATE TABLE mahasiswa (
    nim VARCHAR(4) PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    alamat TEXT,
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
    nilai REAL,
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
INSERT INTO mahasiswa (nim, nama, alamat, id_jurusan) VALUES
('M01', 'Andi Wijaya', 'Jl. Merdeka No.1', 'J01'),
('M02', 'Sinta Dewi', 'Jl. Mawar No.2', 'J02'),
('M03', 'Riko Pratama', 'Jl. Kenanga No.3', 'J01'),
('M04', 'Lina Putri', 'Jl. Melati No.4', 'J03');

-- Matakuliah
INSERT INTO matakuliah (id_matkul, nama, sks, id_dosen) VALUES
('MK1', 'Basis Data', 3, 'D01'),
('MK2', 'Pemrograman', 4, 'D02'),
('MK3', 'Manajemen Proyek', 2, 'D03');

-- Nilai
INSERT INTO nilai (id_nilai, nim, id_matkul, nilai) VALUES
('N01', 'M01', 'MK1', 85.5),
('N02', 'M01', 'MK2', 90.0),
('N03', 'M02', 'MK3', 78.0),
('N04', 'M03', 'MK1', 88.0),
('N05', 'M03', 'MK2', 92.0),
('N06', 'M04', 'MK3', 80.0);