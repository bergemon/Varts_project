export type IUser = {
    id: string;
    name: string;
    dateBirth: string;
    email: string;
    language: Language;
    avatar: string;
}

export type IUserResponse = {
    access: string;
    refresh: string;
    user: IUser;
}

export type IUserRegister = {
    email: string;
    password: string;
    password_repeat: string;
}

enum Language {
    russian = "Русский",
    english = "Английский"
}