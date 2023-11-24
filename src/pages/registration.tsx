import { BaseButton } from '@/components/UI/baseButton';
import { BaseInput } from '@/components/UI/baseInput';
import { CheckPass } from '@/components/UI/checkPass';
import { CheckFieldPass } from '@/data/checkFieldPass';
import { LayoutNoAuth } from '@/layout/layoutNoAuth';
import { CalcHeight, CalcWidth } from '@/utils/calcSize';

export default function Registration() {
  return (
    <LayoutNoAuth>
      <div className="mt-[2.93vh] flex flex-col items-center">
        <form style={{ width: CalcWidth(430)}} className={`h-full p-[3.15vh] bg-opacity20 rounded-[1.09vh] gap-[3.26vh] flex flex-col`}>
          <BaseInput placeholder="E-email" color="form" />
          <BaseInput icon="password" placeholder="Пароль" color="form" />
          <BaseInput icon="password" placeholder="Повторите пароль" color="form" />
          <div className="flex flex-wrap gap-[0.625vw] text-white">
            {CheckFieldPass.map(item => (
              <CheckPass label={item.label} key={item.id} />
            ))}
          </div>
          <div>
            <BaseButton color="formAuth">Зарегистрироваться</BaseButton>
          </div>
          <div className="flex justify-center text-white text-xs px-5 text-center">
            Нажимая на кнопку «Отправить» Вы даете свое согласие с пользовательским соглашением
          </div>
          <div className="text-base font-medium text-white text-center">У меня уже есть аккаунт</div>
        </form>
      </div>
    </LayoutNoAuth>
  )
}
