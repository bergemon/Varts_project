export type IUser = {
    id: string;
    userName: string;
    dateBirth: string;
    email: string;
    language: Language;
    avatar: string;
}

export type IUserResponse = {
    access: string;
    email: string;
}

enum Language {
    russian = "Русский",
    english = "Английский"
}