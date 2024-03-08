import { FormConstructor } from "@/components/formConstructor";
import { ModalComponent } from "@/components/modalComponent";
import { createContext, useContext, useState } from "react";
import { IForm } from "@/types/form";
import { FieldValues, UseFormRegister, UseFormReset } from "react-hook-form";

interface ModalContextType {
    modalType: ModalType;
    openModal: (type: ModalType, data?: any) => void; // Замените `any` на более конкретный тип данных, если возможно
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
    modalType: '',
    openModal: () => { },
    closeModal: () => { },
});

export const useModalContext = () => useContext(ModalContext);

type Props<T extends FieldValues> = {
    children: React.ReactNode;
    fieldList: IForm<T>[];
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    register: UseFormRegister<T>;
    errors?: Record<string, any>;
    reset?: UseFormReset<T>;
}

type ModalType = 'create' | 'edit' | 'delete' | '';

export const ModalProvider = <T extends FieldValues>({ children, fieldList, onSubmit, register, errors, reset }: Props<T>) => {
    const [modalType, setModalType] = useState<ModalType>('');

    const openModal = (type: ModalType, data: T) => {
        setModalType(type);
        if(data && reset) {
            reset(data)
        }
    };

    const closeModal = () => {
        setModalType('');
    };

    return (
        <ModalContext.Provider value={{ modalType, openModal, closeModal }}>
            {children}
            <ModalComponent
            open={modalType != ''}
            onClose={closeModal}
            title=""
            onConfirm={() => console.log('')}
        >
            {modalType === 'create' || modalType === 'edit' ?
                <FormConstructor
                    fieldList={fieldList}
                    onSubmit={onSubmit}
                    register={register}
                    errors={errors}
                    formClassName="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
                    inputClassName="mb-1 flex flex-col gap-6"
                />
                :
                <div>null</div>
            }
        </ModalComponent>
        </ModalContext.Provider>
    );
};