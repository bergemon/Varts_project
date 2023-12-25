import { BaseButton } from '@/components/UI/baseButton';
import { BaseInput } from '@/components/UI/baseInput';
import { CheckPass } from '@/components/UI/validatePassword';
import { LayoutNoAuth } from '@/layout/layoutNoAuth';
import { useRegUserMutation } from '@/service/vartsService';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials, setUser } from '@/store/slice/authSlice';
import { IUserRegister } from '@/types/user';
import { CalcHeight, CalcWidth } from '@/utils/calcSize';
import { authLogin } from '@/utils/isAuth';
import { CheckFieldPass } from '@/utils/validateRegisterPassword';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DefaultAvatarIcon from 'public/assets/vector/profile_default_avatar.svg';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const optionsLang = [
  { label: "Русский", value: "ru" },
  { label: "English", value: "en" }
]

export default function ProfileConfirm() {

  const [selected, setSelected] = useState(optionsLang[0])
  // хук регистрации
  const [registerUser, { data, isError, isLoading, error }] = useRegUserMutation();

  // регистрация формы
  const { register, watch, handleSubmit, formState: { errors } } = useForm<IUserRegister>();

  // слежение за паролем
  const password = watch('password');

  const dispatch = useAppDispatch()

  const router = useRouter()

  const registrationUser: SubmitHandler<IUserRegister> = (data) => {
    toast.promise(
      registerUser(data).unwrap(),
      {
        loading: 'Регистрация...',
        success: (data) => `Регистрация прошла успешно ${data.user.email}`,
        error: (err) => `Произошла ошибка (${err.data.message})`
      }
    ).then((res) => {
      authLogin(res.access)
      const token = res.access
      localStorage.setItem('access', token)
      dispatch(setCredentials(res))
      dispatch(setUser(res))
      router.push('/')
    })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <LayoutNoAuth logoTitle>
      <div className="mt-[100px] flex flex-col items-center">
        <form onSubmit={handleSubmit((data) => registrationUser(data))} style={{ width: CalcWidth(430) }} className={`h-full p-[3.15vh] pt-[100px] relative bg-opacity20 rounded-[1.09vh] gap-[3.26vh] flex flex-col`}>
          <div className="absolute flex items-center pr-3 justify-center -top-14 left-1/2 -translate-x-1/2 bg-white h-[140px] w-[140px] rounded-500xl">
            <div className="relative">
              <DefaultAvatarIcon />
              <label className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>
          <h4 className="text-xs text-center text-white">Выберите себе аватар.<br />
            По умолчанию будет использоваться стандартный.</h4>
          <BaseInput {...register("email")} error={errors.email} placeholder="Имя игрока" color="form" />
          <BaseInput {...register("password")} error={errors.password} type="password" placeholder="Дата рождения" color="form" />
          {password && <div className="grid grid-cols-2 gap-[0.625vw] text-white">
            {CheckFieldPass.map(item => (
              <CheckPass label={item.label} key={item.id} checked={item.regex.test(password)} />
            ))}
          </div>}
          {/* {isError && error && <p>{error.data.message.toString()}</p>} */}
          <div className="flex items-center justify-between">
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative w-full">
                <Listbox.Button className="relative w-full bg-white rounded-[3px] h-[48px] pl-4 pr-16 outline-none text-dark">
                  <span className="block truncate text-black">{selected.label}</span>
                  <span className="pointer-events-none text-black absolute inset-y-0 right-0 flex items-center pr-2">
                    ''
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {optionsLang.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                              {person.label}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">

                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div>
            <BaseButton type="submit" color="formAuth" disabled={isLoading}>Сохранить</BaseButton>
          </div>
        </form>
      </div>
    </LayoutNoAuth>
  )
}