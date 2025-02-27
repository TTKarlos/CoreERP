
const Serializer = require('../utils/serializer');

class ProveedorSerializer extends Serializer {
    constructor(data) {
        super(data, 'proveedor');
    }

    serializeItem(proveedor) {
        return {
            id: proveedor.id,
            nombre: proveedor.nombre,
            email: proveedor.email,
            telefono: proveedor.telefono,
            direccion: proveedor.direccion,
            activo: proveedor.activo,
        };
    }
}

module.exports = ProveedorSerializer;