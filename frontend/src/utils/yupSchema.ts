import * as Yup from "yup";
import { CheckFieldPass } from "./validateRegisterPassword";

// Форма регистрации
export const SignUpSchema = Yup.object({
    email: Yup.string().email('Неправильный формат email').required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым')
        .test('checkFields', 'Пароль должен содержать латинские буквы, цифры, специальные символы и не менее 8 символов', (value) => {
            if (!value) return false;
            return CheckFieldPass.every(({ regex }) => regex.test(value));
        }),
    password_repeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Поле обязательно'),
})

export type ISignUpType = Yup.InferType<typeof SignUpSchema>;


// форма создания профиля
export const SignCreateProfileSchema = Yup.object({
    userName: Yup.string().required('Имя игрока обязательно'),
    birthDate: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым'),
    language: Yup.string()
        .required('Поле обязательно'),
})

export type ISignUpProfileType = Yup.InferType<typeof SignCreateProfileSchema>;


// форма логина
export const SignInSchema = Yup.object({
    email: Yup.string().email('Неправильный формат email').required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым')
        .test('checkFields', 'Пароль должен содержать латинские буквы, цифры, специальные символы и не менее 8 символов', (value) => {
            if (!value) return false;
            return CheckFieldPass.every(({ regex }) => regex.test(value));
        }),
});

export type ISignInType = Yup.InferType<typeof SignInSchema>;