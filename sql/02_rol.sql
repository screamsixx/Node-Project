CREATE TABLE Rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(255) NOT NULL,
    descripcion_rol VARCHAR(255) NOT NULL,
    fk_tabla_estatus INT NOT NULL,
    FOREIGN KEY (fk_tabla_estatus) REFERENCES Estatus(id_estatus)
);