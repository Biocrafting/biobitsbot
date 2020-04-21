class BaseModifier {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.baseValue = data.baseValue;
        this.scaling = data.scaling;
    }
    getValue(count) {
        const value = this.baseValue * (count * this.scaling);
        return value;
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
}
//# sourceMappingURL=modifier.js.map