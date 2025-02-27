class Serializer {
    constructor(data, resourceType) {
        this.data = data;
        this.resourceType = resourceType;
    }

    serialize() {
        if (Array.isArray(this.data)) {
            return this.data.map(item => this.serializeItem(item));
        }
        return this.serializeItem(this.data);
    }

    serializeItem(item) {
        return item;
    }
}

module.exports = Serializer;