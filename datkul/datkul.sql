CREATE TABLE Jurusan (
    id_jurusan INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_jurusan TEXT
);

CREATE TABLE Mahasiswa (
    nim TEXT PRIMARY KEY,
    nama TEXT,
    alamat TEXT,
    id_jurusan INTEGER,
    FOREIGN KEY (id_jurusan) REFERENCES Jurusan(id_jurusan)
);

CREATE TABLE Dosen (
    id_dosen INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT
);

CREATE TABLE Matakuliah (
    id_matakuliah INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT,
    sks INTEGER,
    id_dosen INTEGER,
    FOREIGN KEY (id_dosen) REFERENCES Dosen(id_dosen)
);

CREATE TABLE KRS (
    nim TEXT,
    id_matakuliah INTEGER,
    PRIMARY KEY (nim, id_matakuliah),
    FOREIGN KEY (nim) REFERENCES Mahasiswa(nim),
    FOREIGN KEY (id_matakuliah) REFERENCES Matakuliah(id_matakuliah)
);
