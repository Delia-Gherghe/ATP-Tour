export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Theme: undefined;
    Profile: undefined;
    About: undefined;
}

export type Player = {
    cod: number;
    mesaj: string;
    nume: string;
}

export type User = {
    id: number | null;
    nume: string | null;
}

export type UserContextType = {
    usr: User;
    changeUser: (u: User) => void;
}

export type DopingProfile = {
    id?: number;
    adresa?: string;
    lat?: number;
    lng?: number;
    informatii?: string;
    ora_start?: number;
    minute_start?: number;
}