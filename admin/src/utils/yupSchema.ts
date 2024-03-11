import * as Yup from "yup";

// Форма регистрации
export const SignUpSchema = Yup.object({
    userName: Yup.string().required('Обязательное поле'),
    email: Yup.string().email('Неправильный формат email').required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым'),
    password_repeat: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
        .required('Поле обязательно'),
})

export type ISignUpType = Yup.InferType<typeof SignUpSchema>;


// форма логина
export const SignInSchema = Yup.object({
    email: Yup.string().email('Неправильный формат email').required('Обязательное поле'),
    password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Не может быть пустым')
});

export type ISignInType = Yup.InferType<typeof SignInSchema>;

// игровые карты
export const gameCardSchema = Yup.object({
    name: Yup.string().required('Обязательное поле'),
    author: Yup.string().required('Обязательное поле'),
    // hashtag: Yup.array().of(Yup.string().required('Обязательное поле')),
    image: Yup.mixed().required('Картинка обязательна'),
});

export type IGameCardType = Yup.InferType<typeof gameCardSchema>;

// игровое поле
export const gameFieldSchema = Yup.object({
    name: Yup.string().required('Обязательное поле'),
    author: Yup.string().required('Обязательное поле'),
    // hashtag: Yup.array().of(Yup.string().required('Обязательное поле')),
    image: Yup.mixed().required('Картинка обязательна'),
});

export type IGameFieldType = Yup.InferType<typeof gameFieldSchema>;


// игровой набор
export const gameSetSchema = Yup.object({
    name: Yup.string().required('Обязательное поле'),
    author: Yup.string().required('Обязательное поле'),
    hashtag: Yup.array().of(Yup.string().required('Обязательное поле')),
    image: Yup.array(),
});

export type IGameSetType = Yup.InferType<typeof gameSetSchema>;