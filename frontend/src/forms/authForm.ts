import { IForm } from "@/types/form";
import { ISignInType, ISignUpProfileType, ISignUpType } from "@/utils/yupSchema";

// форма регистрации
export const authSignUpForm: IForm<ISignUpType>[] = [
    {
        fieldName: "email",
        type: "input",
        placeholder: "E-mail"
    },
    {
        fieldName: "password",
        type: "input",
        placeholder: "Пароль",
        icon: "password",
    },
    {
        fieldName: "password_repeat",
        type: "input",
        placeholder: "Повторите пароль",
        icon: "password"
    }
];

// форма авторизации
export const authCreateProfileForm: IForm<ISignUpProfileType>[] = [
    {
        fieldName: "userName",
        type: "input",
        placeholder: "Имя игрока"
    },
    {
        fieldName: "birthDate",
        type: "input",
        placeholder: "Дата рождения"
    },
    {
        fieldName: "language",
        type: "input",
        placeholder: "Язык"
    }
];

// форма логина
export const authLoginForm: IForm<ISignInType>[] = [
    {
        fieldName: "email",
        type: "input",
        placeholder: "E-mail"
    },
    {
        fieldName: "password",
        type: "input",
        placeholder: "Пароль"
    }
];