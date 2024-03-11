import { FormConstructor } from "@/components/formConstructor";
import { ModalComponent } from "@/components/modalComponent";
import { IForm } from "@/types/form";
import { FieldValues, UseFormRegister, UseFormReset } from "react-hook-form";
import { ModalType, OptionalTitleObject } from "./modalContext";
import { Button } from "@material-tailwind/react";
import { useRef } from "react";


type Props<T extends FieldValues> = {
    children: React.ReactNode;
    fieldList: IForm<T>[];
    onSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
    register: UseFormRegister<T>;
    errors?: Record<string, any>;
    reset?: UseFormReset<T>;
    title: OptionalTitleObject;
    modalType: ModalType;
    closeModal: () => void;
}

export const ModalContainer = <T extends FieldValues>({ children, fieldList, onSubmit, register, errors, modalType, closeModal, title }: Props<T>) => {
    const formRef = useRef<HTMLFormElement>(null);

    const submitForm = () => {
        if (formRef.current && formRef.current.requestSubmit) {
            formRef.current.requestSubmit();
        }
    };
    return (
        <>
            <ModalComponent
                open={modalType != ''}
                onClose={closeModal}
                title={title[modalType] || ''}
                onConfirm={modalType === 'create' || modalType === 'edit' ? submitForm : onSubmit}
            >
                {modalType === 'create' || modalType === 'edit' ?
                    <FormConstructor
                        fieldList={fieldList}
                        onSubmit={onSubmit}
                        register={register}
                        formRef={formRef}
                        errors={errors}
                        formClassName="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                        inputClassName="mb-1 flex flex-col gap-6"
                    />
                    :
                    null
                }
            </ModalComponent>
            {children}
        </>
    );
};