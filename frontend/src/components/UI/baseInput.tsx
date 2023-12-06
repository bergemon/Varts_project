import React, { useState } from "react";
import SearchIcon from "public/assets/vector/search_icon.svg";
import { getInputColor } from "@/colors";
import { ColorInputKey } from "@/types/config";
import { BaseButton } from "./baseButton";
import OnIcon from "public/assets/vector/eye_on_icon.svg"
import OffIcon from "public/assets/vector/eye_off_icon.svg"

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  color: ColorInputKey;
  error?: any;
  className?: string;
  icon?: 'search' | 'password';
  flex?: string;
  width?: 'full' | '350xl';
}

export const BaseInput = React.forwardRef<HTMLInputElement, Props>(
  ({ label, color, error, flex, width = 'full', className = '', icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const widthObj = {
      "full": "w-full",
      "350xl": "w-[350px]"
    }
    const componentClass = [
      'ease-in-out',
      'transition',
      'duration-300',
      widthObj[width],
      getInputColor(color)
    ]
    const componentClassString = componentClass.join(' ')
    return (
      <div className={`${flex ? flex : 'flex flex-col'} relative ${className}`}>
        {label && <label className="text-sm text-gray placeholder:text-gray font-semibold">{label}</label>}
        <input type={icon === 'password' ? showPassword ? 'text' : 'password' : undefined} className={componentClassString} ref={ref} {...props} />
        {error &&
          <p className="absolute text-xs -bottom-8 text-red-500">{error}</p>
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