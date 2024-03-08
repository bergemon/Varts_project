import { useState } from "react";

// Определение типа для параметров хука
type UsePageChangeHook = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
};

// Создание пользовательского хука для управления сменой страницы
export const usePageChange = (initialPage: number = 0): UsePageChangeHook => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const changePage = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return { currentPage, setCurrentPage: changePage };
}