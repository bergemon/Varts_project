import { BaseButton } from '@/components/UI/baseButton';
import { BaseInput } from '@/components/UI/baseInput';
import { LayoutNoAuth } from '@/layout/layoutNoAuth';
import { CalcHeight, CalcWidth } from '@/utils/calcSize';

export default function Registration() {
  return (
    <LayoutNoAuth>
      <div className="mt-[2.93vh] flex flex-col items-center">
        <form style={{ width: CalcWidth(430)}} className={`h-[40vh] flex flex-col p-[3.15vh] bg-opacity20 rounded-[1.09vh]`}>
          <div className="gap-[3.26vh] flex flex-col">
            <BaseInput placeholder="E-email" color="form" />
            <BaseInput type="password" placeholder="Пароль" color="form" />
          </div>
          <div className="flex justify-end mt-2.5 text-white">
            Забыли пароль?
          </div>
          <div className="mt-auto">
            <BaseButton color="formAuth">Войти</BaseButton>
          </div>
        </form>
      </div>
    </LayoutNoAuth>
  )
}
