import { IForm, IFormType } from "@/types/form";
import { Input, Typography } from "@material-tailwind/react";
import { FieldValues, UseFormRegister } from "react-hook-form";



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
            <Input
                crossOrigin=""
                key={index}
                {...register(item.fieldName!)}
                label={item.label}
                placeholder={item.placeholder}
                error={item.fieldName && errors && errors[item.fieldName]?.message}
            />
        ),
        title: (item: IForm<T>, index: number) => (
            <Typography key={index}>{item.label}</Typography>
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