const yup = require("yup")

const proveedorSchema = yup.object().shape({
    nombre: yup
        .string()
        .required("El nombre del proveedor es requerido")
        .max(100, "El nombre no puede tener más de 100 caracteres"),
    direccion: yup.string().nullable().max(200, "La dirección no puede tener más de 200 caracteres"),
    telefono: yup
        .string()
        .nullable()
        .max(20, "El número de teléfono no puede tener más de 20 caracteres")
        .matches(/^[0-9+\-\s()]*$/, "Número de teléfono inválido"),
    email: yup
        .string()
        .required("El email del proveedor es requerido")
        .email("Formato de email inválido")
        .max(100, "El email no puede tener más de 100 caracteres"),
    activo: yup.boolean().default(true),
})

module.exports = proveedorSchema

