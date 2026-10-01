-- Restricciones de la tabla Administrador

ALTER TABLE "Administrador"
    ADD CONSTRAINT "PK_Administrador" PRIMARY KEY ("idAdmin");

ALTER TABLE "Administrador"
    ALTER COLUMN "nombreAdmin" SET NOT NULL,
    ALTER COLUMN "contrasena" SET NOT NULL,
    ALTER COLUMN "nombreUsuario" SET NOT NULL;

ALTER TABLE "Administrador"
    ADD CONSTRAINT "UQ_Administrador_NombreUsuario" UNIQUE ("nombreUsuario");

ALTER TABLE "Administrador"
    ADD CONSTRAINT "CK_Administrador_NombreUsuario"
    CHECK (char_length("nombreUsuario") BETWEEN 5 AND 10);

ALTER TABLE "Administrador"
    ADD CONSTRAINT "CK_Administrador_Contrasena"
    CHECK (char_length("contrasena") >= 12);

-- Restricciones de la tabla Cliente

ALTER TABLE "Cliente"
    ADD CONSTRAINT "PK_Cliente" PRIMARY KEY ("idCliente");

ALTER TABLE "Cliente"
    ALTER COLUMN "nombreCliente" SET NOT NULL,
    ALTER COLUMN "telefono" SET NOT NULL,
    ALTER COLUMN "montoPago" SET NOT NULL,
    ALTER COLUMN "tipoEntrada" SET NOT NULL,
    ALTER COLUMN "tipoPago" SET NOT NULL,
    ALTER COLUMN "fechaRegistro" SET NOT NULL;

ALTER TABLE "Cliente"
    ADD CONSTRAINT "CK_Cliente_Telefono"
    CHECK ("telefono" ~ '^[0-9]{8}$');

ALTER TABLE "Cliente"
    ADD CONSTRAINT "CK_Cliente_MontoPago"
    CHECK ("montoPago" BETWEEN 0 AND 10000);

ALTER TABLE "Cliente"
    ADD CONSTRAINT "CK_Cliente_TipoEntrada"
    CHECK ("tipoEntrada" IN ('mensual', 'semanal', 'sesión'));

ALTER TABLE "Cliente"
    ADD CONSTRAINT "CK_Cliente_TipoPago"
    CHECK ("tipoPago" IN ('efectivo', 'QR'));

ALTER TABLE "Cliente"
    ALTER COLUMN "fechaRegistro" SET DEFAULT CURRENT_DATE;
