class ModifierModel {
    constructor() {
        this.modifiers = [];
    }
    getModifier(id) {
        return this.modifiers.find((mod) => mod.getId() === id);
    }
    addModifier(data) {
        this.modifiers.push(new BaseModifier(data));
    }
}
//# sourceMappingURL=modifiertmodel.js.map