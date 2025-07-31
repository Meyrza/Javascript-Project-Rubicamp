-- Tabel Jurusan
CREATE TABLE jurusan (
    id_jurusan INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_jurusan TEXT NOT NULL
);

-- Tabel Mahasiswa
CREATE TABLE mahasiswa (
    nim TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    alamat TEXT,
    id_jurusan INTEGER,
    FOREIGN KEY (id_jurusan) REFERENCES jurusan(id_jurusan)
);

-- Tabel Dosen
CREATE TABLE dosen (
    id_dosen INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL
);

-- Tabel Matakuliah
CREATE TABLE matakuliah (
    id_matkul INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    sks INTEGER,
    id_dosen INTEGER,
    FOREIGN KEY (id_dosen) REFERENCES dosen(id_dosen)
);

-- Tabel Nilai
CREATE TABLE nilai (
    id_nilai INTEGER PRIMARY KEY AUTOINCREMENT,
    nim TEXT,
    id_matkul INTEGER,
    id_dosen INTEGER,
    nilai REAL,
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (id_matkul) REFERENCES matakuliah(id_matkul),
    FOREIGN KEY (id_dosen) REFERENCES dosen(id_dosen)
);

-- Isi data jurusan
INSERT INTO jurusan (nama_jurusan) VALUES
('Teknik Informatika'),
('Sistem Informasi'),
('Manajemen');

-- Isi data dosen
INSERT INTO dosen (nama) VALUES
('Budi Santoso'),
('Ani Lestari'),
('Rudi Hartono');

-- Isi data mahasiswa
INSERT INTO mahasiswa (nim, nama, alamat, id_jurusan) VALUES
('220101', 'Andi Wijaya', 'Jl. Merdeka No.1', 1),
('220102', 'Sinta Dewi', 'Jl. Mawar No.2', 2),
('220103', 'Riko Pratama', 'Jl. Kenanga No.3', 1);

-- Isi data matakuliah
INSERT INTO matakuliah (nama, sks, id_dosen) VALUES
('Basis Data', 3, 1),
('Pemrograman', 4, 2),
('Manajemen Proyek', 2, 3);

-- Isi data nilai
INSERT INTO nilai (nim, id_matkul, id_dosen, nilai) VALUES
('220101', 1, 1, 85.5),
('220101', 2, 2, 90.0),
('220102', 3, 3, 78.0),
('220103', 1, 1, 88.0),
('220103', 2, 2, 92.0);