import { BaseButton } from '@/components/UI/baseButton';
import { LayoutNoAuth } from '@/layout/layoutNoAuth';
import { useUserCreateProfileMutation } from '@/service/vartsService';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setUser } from '@/store/slice/authSlice';
import { authLogin, isAuth } from '@/utils/isAuth';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { yupResolver } from "@hookform/resolvers/yup";
import { FormConstructor } from '@/components/formConstructor';
import { authCreateProfileForm } from '@/forms/authForm';
import { NextPageContext } from 'next';
import { ISignUpProfileType, SignCreateProfileSchema } from '@/utils/yupSchema';

export default function Registration() {

    // хук регистрации
    const [registerUser, { data, isError, isLoading, error }] = useUserCreateProfileMutation();

    // регистрация формы
    const { register, watch, handleSubmit, control, formState: { errors } } = useForm<ISignUpProfileType>({
        resolver: yupResolver(SignCreateProfileSchema),
    });


    const dispatch = useAppDispatch()

    const router = useRouter()

    const registrationUser: SubmitHandler<ISignUpProfileType> = (data) => {
        toast.promise(
            registerUser(data).unwrap(),
            {
                loading: 'Регистрация...',
                success: (data) => `Регистрация прошла успешно ${data.data.email}`,
                error: (err) => `Произошла ошибка (${err.data.message})`
            }
        ).then((res) => {
            authLogin(res.data.access)
            const token = res.data.access
            localStorage.setItem('access', token)
            dispatch(setCredentials(res.data))
            dispatch(setUser(res.data.user))
            console.log(res)
            router.push('/')
        })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <LayoutNoAuth logoTitle>
            <div className="mt-[2.93vh] flex flex-col items-center">
                <FormConstructor
                    containerClassName="h-full w-1/2 p-[3.15vh] bg-opacity20 rounded-[1.09vh] "
                    inputClassName="gap-[3.26vh] flex flex-col"
                    formClassName="gap-[3.26vh] flex flex-col"
                    onSubmit={handleSubmit(data => registrationUser(data))}
                    errors={errors}
                    fieldList={authCreateProfileForm}
                    register={register}
                >
                    <BaseButton type="submit" color="formAuth" disabled={isLoading}>Сохранить</BaseButton>
                </FormConstructor>
            </div>
        </LayoutNoAuth>
    )
}

export const getServerSideProps = async (ctx: NextPageContext) => {
    const isAuthencate = await isAuth(ctx)

    if (!isAuthencate) {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            },
        }
    }

    return {
        props: {},
    }
};