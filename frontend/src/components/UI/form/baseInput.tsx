import React, { useState } from "react";
import SearchIcon from "public/assets/vector/search_icon.svg";
import OnIcon from "public/assets/vector/eye_on_icon.svg"
import OffIcon from "public/assets/vector/eye_off_icon.svg"
import { BaseButton } from "../baseButton";
import { IColorInputKey, IFormIcon } from "@/types/form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  color?: IColorInputKey;
  error?: any;
  className?: string;
  icon?: IFormIcon;
}

export const BaseInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, color = 'form', error, className = '', icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    // оформление инпутов
    const inputs = {
      form: 'bg-white rounded-[3px] h-[48px] pl-4 pr-16 outline-none text-dark',
      search: 'bg-white rounded-[3px] h-[48px] pl-12 pr-32 outline-none text-dark'
    }

    const componentClass = [
      'ease-in-out',
      'transition',
      'duration-300',
      inputs[color]
    ]
    const componentClassString = componentClass.join(' ')
    return (
      <div className={`flex flex-col relative${className ? ' ' + className : ''}`}>
        {label && <label className="text-sm text-gray placeholder:text-gray font-semibold">{label}</label>}
        <input type={icon === 'password' ? showPassword ? 'text' : 'password' : 'text'} className={componentClassString} ref={ref} {...props} />
        {error &&
          <p className="text-xs text-red-500">{error}</p>
        }
        {icon === 'search' && (
          <>
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2" />
            <BaseButton color="search">Найти</BaseButton>
          </>
        )
        }
        {icon === 'password' && (
          <div onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2">
            {showPassword ? <OffIcon /> : <OnIcon />}
          </div>
        )}
      </div>
    )
  }
);

BaseInput.displayName = "BaseInput";