const yup = require("yup")

const productoSchema = yup.object().shape({
    nombre: yup
        .string()
        .required("El nombre del producto es requerido")
        .max(50, "El nombre no puede tener más de 50 caracteres"),
    descripcion: yup
        .string()
        .required("La descripción es requerida")
        .max(50, "La descripción no puede tener más de 50 caracteres"),
    imagen: yup
        .string()
        .required("La URL de la imagen es requerida")
        .max(50, "La URL de la imagen no puede tener más de 50 caracteres"),

    precio: yup.number().required("El precio es requerido").positive("El precio debe ser un número positivo"),
    stock: yup
        .number()
        .required("El stock es requerido")
        .integer("El stock debe ser un número entero")
        .min(0, "El stock no puede ser negativo"),
})

module.exports = productoSchema

