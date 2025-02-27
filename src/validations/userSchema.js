const yup = require("yup")
const { ROLES } = require("../utils/constants")

const baseUserSchema = {
    username: yup.string().required("El nombre de usuario es requerido").min(3).max(50),
    email: yup.string().required("El email es requerido").email().max(100),
    firstName: yup.string().nullable().max(50),
    lastName: yup.string().nullable().max(50),
    role: yup.string().oneOf(Object.values(ROLES), "Rol no válido").default(ROLES.EMPLOYEE),
    isActive: yup.boolean().default(true),
}

exports.createUserSchema = yup.object({
    ...baseUserSchema,
    password: yup.string().required("La contraseña es requerida").min(8).max(255),
})

exports.updateUserSchema = yup
    .object({
        ...baseUserSchema,
        password: yup.string().min(8).max(255),
    })
    .noUnknown(true)
    .strict()

