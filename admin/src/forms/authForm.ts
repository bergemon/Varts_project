import { IForm } from "@/types/form";
import { ISignInType,ISignUpType } from "@/utils/yupSchema";

// форма регистрации
export const authSignUpForm: IForm<ISignUpType>[] = [
    {
        fieldName: "userName",
        type: "input",
        placeholder: "Username",
        label: "Username"
    },
    {
        fieldName: "email",
        type: "input",
        placeholder: "E-mail",
        label: "E-mail"
    },
    {
        fieldName: "password",
        type: "input",
        placeholder: "Пароль",
        label: "Пароль"
    },
    {
        fieldName: "password_repeat",
        type: "input",
        placeholder: "Повторите пароль",
        label: "Повторите пароль"
    }
];

// форма логина
export const authLoginForm: IForm<ISignInType>[] = [
    {
        fieldName: "email",
        type: "input",
        placeholder: "E-mail",
        label: "E-mail"
    },
    {
        fieldName: "password",
        type: "input",
        placeholder: "Пароль",
        label: "Пароль"
    }
];