-- Datos de prueba para gimnasiodb.
-- La contraseña original es "chacaeadm123" y se almacena como hash bcrypt
-- utilizando ocho saltos, de acuerdo con la implementación del backend.

INSERT INTO "Administrador" (
    "nombreAdmin",
    "contrasena",
    "nombreUsuario"
) VALUES (
    'Administrador Principal',
    '$2b$08$rLUIh90Rti34H9iUfx/QRebaZ2hiCGAYzD4hCRxEIw7nWD.lSQ2m.',
    'chacaeadm'
);

INSERT INTO "Cliente" (
    "nombreCliente",
    "telefono",
    "montoPago",
    "tipoEntrada",
    "tipoPago"
) VALUES
    ('Juan Pérez',       '70000001', 250.00,  'mensual', 'efectivo'),
    ('María López',      '70000002', 100.00,  'semanal', 'QR'),
    ('Carlos García',    '70000003',  20.00,  'sesión',  'efectivo'),
    ('Ana Martínez',     '70000004', 250.00,  'mensual', 'QR'),
    ('Luis Rodríguez',   '70000005', 100.00,  'semanal', 'efectivo'),
    ('Sofía Fernández',  '70000006',  20.00,  'sesión',  'QR'),
    ('Diego Torres',     '70000007', 250.00,  'mensual', 'efectivo'),
    ('Valentina Flores', '70000008', 100.00,  'semanal', 'QR'),
    ('Jorge Vargas',     '70000009',  20.00,  'sesión',  'efectivo'),
    ('Camila Rojas',     '70000010', 250.00,  'mensual', 'QR');
