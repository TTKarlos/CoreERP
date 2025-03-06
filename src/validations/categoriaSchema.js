const yup = require("yup")

const categoriaSchema = yup.object().shape({
    nombre: yup
        .string()
        .min(2, "El nombre debe tener al menos ${min} caracteres")
        .max(50, "El nombre no puede tener más de ${max} caracteres")
        .required("El nombre es obligatorio")
        .trim()
        .test("is-string", "El nombre debe ser un texto", (value) => typeof value === "string"),

    descripcion: yup
        .string()
        .max(200, "La descripción no puede tener más de ${max} caracteres")
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .trim()
        .test(
            "is-string-or-null",
            "La descripción debe ser un texto",
            (value) => value === null || typeof value === "string",
        ),

    activo: yup
        .boolean()
        .default(true)
        .test("is-boolean", "El campo activo debe ser un valor booleano", (value) => typeof value === "boolean"),
})

module.exports = categoriaSchema

