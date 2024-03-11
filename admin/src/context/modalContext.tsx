import { createContext, useContext, useState } from "react";

interface ModalContextType<T> {
    modalType: ModalType;
    modalData: T | undefined;
    openModal: (type: ModalType, data?: T) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType<any>>({
    modalType: '',
    modalData: undefined,
    openModal: () => { },
    closeModal: () => { },
});

export const useModalContext = <T,>() => useContext<ModalContextType<T>>(ModalContext);

export type ModalType = 'create' | 'edit' | 'delete' | '';

type TitleObject = {
    [K in ModalType]: string;
};

export type OptionalTitleObject = Partial<TitleObject>;

type Props = {
    children: React.ReactNode;
}

export const ModalProvider = <T,>({ children }: Props) => {
    const [modalType, setModalType] = useState<ModalType>('');
    const [modalData, setModalData] = useState<T | undefined>(undefined);

    const openModal = (type: ModalType, data: T) => {
        setModalType(type);
        setModalData(data)
    };

    const closeModal = () => {
        setModalType('');
        setModalData(undefined)
    };

    return (
        <ModalContext.Provider value={{ modalType, modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};