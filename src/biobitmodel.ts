class BioBitModel {
    interval:      number = 0.1;
    intervalId:    number;

    users:          Array<User> = [];
    
    constructor() {

    }

    addUser(id: string): string {
        let mes: string = '';

        if ( !this.users.find((u: User )=> u.getName() == id)) {
            const baseUser: UserData = {id: id, bitCount: 0, modifier: []};
            this.users.push(new User(baseUser));
        }
        else {
            mes = 'User already exits!';
            console.warn(mes);
        }

        return mes;
    }

    start() {
        if (!this.intervalId)
            this.intervalId = setInterval(calculate, this.interval * 1000, this.users, this.interval);
    }
    stop() {
        clearInterval(this.intervalId);

        this.interval = 0;
    }

}

function calculate(users: Array<User>, interval: number) {
    users.map((user) => {
        user.calcGain(interval);
    })
}

//
interface UserData {
    id: string;
    bitCount: number;
    modifier: Array<any>
}

class User {
    data: UserData;
    readonly baseGainPerMinute: number = 100;

    constructor(data: UserData) {
        this.data = data;
    }

    getCount(): number {
        return this.data.bitCount;
    }
    
    setCount(value: number) {
        this.data.bitCount = value            
    }

    getName(): string {
        return this.data.id;
    }

    getId(): string {
        return this.data.id;
    }

    getGain() {
        let multiplier = this.data.modifier.length > 0 ? this.data.modifier.reduce((acc, cur) => acc.getValue() * cur) : 1;
        return this.baseGainPerMinute * multiplier;
    }

    calcGain(interval: number) {
        const newGain = this.getGain() * (interval / 60)
        this.setCount(this.data.bitCount + newGain);
    }
}