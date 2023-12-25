export type CheckField = {
    id: number;
    label: string;
    regex: RegExp;
}

export const CheckFieldPass: CheckField[] = [
    {
        id: 1,
        label: "Латинские буквы",
        regex: /[a-zA-Z]/
    },
    {
        id: 2,
        label: "Цифры",
        regex: /\d/
    },
    {
        id: 3,
        label: "Специальные символы",
        regex: /[!@#$%^&*(),.?":{}|<>]/
    },
    {
        id: 4,
        label: "Не менее 8 символов",
        regex: /.{8,}/
    }
 ]