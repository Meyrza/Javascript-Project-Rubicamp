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

