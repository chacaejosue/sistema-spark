-- Ejecutar este archivo conectado a la base de datos gimnasiodb.

CREATE TABLE "Administrador" (
    "idAdmin" INTEGER GENERATED ALWAYS AS IDENTITY,
    "nombreAdmin" VARCHAR(100),
    "contrasena" VARCHAR(255),
    "nombreUsuario" VARCHAR(10)
);

CREATE TABLE "Cliente" (
    "idCliente" INTEGER GENERATED ALWAYS AS IDENTITY,
    "nombreCliente" VARCHAR(100),
    "telefono" VARCHAR(8),
    "montoPago" NUMERIC(10, 2),
    "tipoEntrada" VARCHAR(20),
    "tipoPago" VARCHAR(10),
    "fechaRegistro" DATE
);
