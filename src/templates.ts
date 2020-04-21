interface UserData {
    id: string;
    bitCount: number;
    modifier: Array<ModifierUserData>
}

interface SaveState {
    interval: number;
    userData: Array<UserData>;
}

interface ModifierUserData {
    id: number;
    count: number;
}