interface Modifier {
    id:        number;
    name:      string
    baseValue: number;
    scaling:   number;
}

class BaseModifier {
    private id:        number;
    private name:      string
    private baseValue: number;
    private scaling:   number;

    constructor(data: Modifier) {
        this.id =        data.id;
        this.name =      data.name;
        this.baseValue = data.baseValue;
        this.scaling =   data.scaling;
    }

    getValue(count: number): number {
        const value: number = this.baseValue * (count * this.scaling);
        return value;        
    }

    getId(): number {
        return this.id;
    }
    getName(): string {
        return this.name;
    }
}