class ModifierModel {
    private modifiers: Array<BaseModifier> = [];

    constructor() {

    }

    getModifier(id: number): BaseModifier {
        return this.modifiers.find((mod) => mod.getId() === id);
    }

    addModifier(data: Modifier) {
        this.modifiers.push(new BaseModifier(data));
    }
}