CREATE TABLE Catalogo_negocios (
    id_negocio INT AUTO_INCREMENT PRIMARY KEY,
    nombre_negocio VARCHAR(255) NOT NULL,
    descripcion_negocio VARCHAR(255) NOT NULL,
    fk_tabla_estatus INT NOT NULL,
    FOREIGN KEY (fk_tabla_estatus) REFERENCES Estatus(id_estatus)
);