-- 1. Insertar un estatus (por ejemplo, "Activo")
INSERT INTO Estatus (nombre_estatus, descripcion_estatus)
VALUES ('Activo', 'El estatus está activo');

-- 2. Insertar un rol "Admin"
INSERT INTO Rol (nombre_rol, descripcion_rol, fk_tabla_estatus)
VALUES ('Admin', 'Administrador del sistema', 1);

-- 3. Insertar un negocio de ejemplo
INSERT INTO Catalogo_negocios (nombre_negocio, descripcion_negocio, fk_tabla_estatus)
VALUES ('Negocio Principal', 'Negocio usado por el administrador', 1);

-- 4. Insertar el usuario admin
INSERT INTO Usuario (
    nombre_usuario,
    apellido_usuario,
    email_usuario,
    telefono_usuario,
    contrasena_usuario,
    fecha_nacimiento_usuario,
    genero_usuario,
    direccion_usuario,
    ciudad_usuario,
    estado_usuario,
    codigo_postal_usuario,
    fk_tabla_rol,
    fk_tabla_estatus,
    fk_tabla_catalogo_negocios,
    codigo_autenticacion_usuario, usuario
) VALUES (
    'Admin',
    'Principal',
    'admin@dominio.com',
    '1234567890',
    'admin', -- Se recomienda encriptar esto si es un sistema real
    '1990-01-01',
    'M',
    'Calle Falsa 123',
    'Ciudad Central',
    'Estado Ejemplo',
    '00000',
    1,  -- ID del rol Admin
    1,  -- ID del estatus Activo
    1,  -- ID del negocio
    '1234' -- Código de autenticación (si se usa),
    'admin'
);
