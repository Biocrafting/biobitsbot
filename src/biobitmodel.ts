class BioBitModel {
    interval:      number = 0.1;
    intervalId:    number;

    users:          Array<User> = [];
    
    constructor() {

    }

    addUser(id: string): string {
        let mes: string = '';

        if ( !this.users.find((u: User )=> u.id == id))
            this.users.push(new User(id));
        else {
            mes = 'User already exits!';
            console.warn(mes);
        }

        return mes;
    }

    start() {
        this.intervalId = setInterval(calculate, this.interval * 1000, this.users, this.interval);
    }
}


function calculate(users: Array<User>, interval: number) {
    users.map((user) => {
        user.calcGain(interval);
    })
}

//

class User {
    id: string;

    bitCount: number = 0;
    readonly baseGainPerMinute: number = 100;

    modifier:          Array<any> = [];

    constructor(id: string) {
        this.id = id;
    }

    getCount(): number {
        return this.bitCount;
    }
    
    setCount(value: number) {
        this.bitCount = value            
    }

    getName(): string {
        return this.id;
    }

    getGain() {
        let multiplier = this.modifier.length > 0 ? this.modifier.reduce((acc, cur) => acc.value * cur) : 1;
        return this.baseGainPerMinute * multiplier;
    }

    calcGain(interval: number) {
        const newGain = this.getGain() * (interval / 60)
        this.setCount(this.bitCount + newGain);
    }

}