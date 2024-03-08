import { FormConstructor } from "@/components/formConstructor";
import { authLoginForm } from "@/forms/authForm";
import { LayoutNoAuth } from "@/layout/layoutNoAuth";
import { useLoginUserMutation } from "@/service/vartsService";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials, setUser } from "@/store/slice/authSlice";
import { authLogin } from "@/utils/isAuth";
import { ISignInType, SignInSchema } from "@/utils/yupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
  // регистрация формы
  const { register, handleSubmit, formState: { errors } } = useForm<ISignInType>({
    resolver: yupResolver(SignInSchema),
  });

  const [registerUser, { isLoading }] = useLoginUserMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const registrationUser: SubmitHandler<ISignInType> = (data) => {
    toast.promise(
      registerUser(data).unwrap(),
      {
        loading: 'Регистрация...',
        success: (data) => `Регистрация прошла успешно ${data.data.manager.email}`,
        error: (err) => `Произошла ошибка (${err.data.message})`
      }
    ).then((res) => {
      dispatch(setUser(res.data.manager));
      authLogin(res.data.accessToken);
      localStorage.setItem('token', res.data.accessToken);
      dispatch(setCredentials(res.data.accessToken));
      router.push('/')
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Card color="transparent" className="px-10 py-10" shadow={true}>
      <Typography variant="h4" color="blue-gray">
        Вход в систему
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Войдите в систему
      </Typography>
      <FormConstructor fieldList={authLoginForm} onSubmit={handleSubmit(data => registrationUser(data))} register={register}
        formClassName="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        inputClassName="mb-1 flex flex-col gap-6"
        errors={errors}
      >
        <Button type="submit" className="mt-6" fullWidth>
          Войти
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Ещё нет аккаунта?{" "}
          <Link href="/registration" className="font-medium text-blue-700">
            Зарегистрироваться
          </Link>
        </Typography>
      </FormConstructor>
    </Card>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutNoAuth>{page}</LayoutNoAuth>
}