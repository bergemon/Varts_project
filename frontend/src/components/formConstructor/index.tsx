import { IForm, IFormType } from "@/types/form";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { BaseInput } from "../UI/form/baseInput";



type Props<T extends FieldValues> = {
    containerClassName?: string;
    formClassName?: string;
    fieldList: IForm<T>[];
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    register: UseFormRegister<T>;
    children?: React.ReactNode;
    errors?: Record<string, any>;
    inputClassName?: string;
}

export function FormConstructor<T extends FieldValues>({
    containerClassName, formClassName, fieldList, onSubmit, register, children, errors, inputClassName,
}: Props<T>) {

    const renderMap: Record<IFormType, (item: IForm<T>, index: number) => JSX.Element> = {
        input: (item: IForm<T>, index: number) => (
            <BaseInput
                key={index}
                {...register(item.fieldName!)}
                label={item.label}
                color={item.color}
                placeholder={item.placeholder}
                icon={item.icon}
                error={item.fieldName && errors && errors[item.fieldName]?.message}
            />
        ),
        title: (item: IForm<T>, index: number) => (
            <h4 key={index} className="text-textPrimary py-5 font-bold text-base">{item.label}</h4>
        ),
    };
    return (
        <div className={containerClassName}>
            <form className={formClassName} onSubmit={onSubmit}>
                <div className={inputClassName}>
                    {fieldList.map((item, index) => {
                        return renderMap[item.type](item, index)
                    })}
                </div>
                {children}
            </form>
        </div>
    );
};