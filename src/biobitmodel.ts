interface UserData {
    id: string;
    bitCount: number;
    modifier: Array<any>
}

interface SaveState {
    interval: number;
    userData: Array<UserData>;
}

class BioBitModel {
    interval:      number = 0.1;
    intervalId:    number = -1;

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
            mes = 'A user with that name already exits!';
            console.warn(mes);
        }

        return mes;
    }

    deleteUser(id: string) {
        this.users = this.users.filter((user) => user.getId() !== id);

        if(this.users.length <= 0) {
            this.stop();
        }
    }


    start() {
        if (this.intervalId < 0)
            this.intervalId = setInterval(calculate, this.interval * 1000, this.users, this.interval);
    }
    stop() {
        clearInterval(this.intervalId);

        this.intervalId = -1;
    }

    save(): string {
        const userData: Array<UserData> = this.users.map(user => user.data);
        
        const saveState: SaveState = {
            interval: this.interval,
            userData: userData,
        }

        return JSON.stringify(saveState, null, 2);
    }

    load(data: string) {

        this.stop();

        const saveState: SaveState = JSON.parse(data);

        console.log(this.intervalId);

        this.interval = saveState.interval;
        this.users = [];

        for (let i = 0; i < saveState.userData.length; i++) {
            const data = saveState.userData[i];
            this.users.push(new User(data));            
        }

        this.start();
    }

    getState(): boolean {
        return ( this.intervalId >= 0 );
    }

    toggle() {
        this.getState() ? this.stop() : this.start();
    }
}

function calculate(users: Array<User>, interval: number) {
    users.map((user) => {
        user.calcGain(interval);
    })
}

//


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