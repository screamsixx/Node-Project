CREATE TABLE Catalogo_modulos (
    id_modulo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_modulo VARCHAR(255) NOT NULL,
    descripcion_modulo VARCHAR(255) NOT NULL,
    fk_tabla_estatus INT NOT NULL,
    FOREIGN KEY (fk_tabla_estatus) REFERENCES Estatus(id_estatus)
);