import { colorsBg } from "@/colors";
import { MenuDropDownProps } from "@/menuDropdown";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import React, { Fragment } from "react";
import CloseIcon from "public/assets/vector/dropdown_close_icon.svg";

type Props = {
    children: React.ReactNode;
    links: MenuDropDownProps[];
    isBg?: boolean;
    menuRight?: boolean;
    width: '195' | '228' | '440';
}

export const MenuDropDown = ({ children, links, isBg = false, menuRight = false, width }: Props) => {
    const widthObj = {
        195: "w-[195px]",
        228: "w-[228px]",
        440: "w-[440px]"
    }
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className={`flex gap-2.5 h-9 rounded-[500px] pl-[3px] pt-0.5 pb-0.5 pr-2.5 items-center ${isBg ? "bg-opacity10" : "bg-transparent"} hover:bg-black/30`}>
                {children}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className={`absolute z-20 ${menuRight ? 'right-0' : 'left-0'} ${widthObj[width]} mt-2 rounded-10xl shadow-primMenu ${colorsBg.main} `}>
                    {links.map((link) => (
                        <Menu.Item key={link.href} href={link.href} as={Link}>
                            {({ active }) => (
                                <button
                                    className={`${active ? 'bg-violet-500' : ''
                                        } group gap-1.5 flex w-full rounded-10xl items-center px-5 py-2.5 text-base font-normal`}
                                >
                                    {link.icon ? (
                                        <>
                                            <div>
                                                {link.icon}
                                            </div>
                                            <div>
                                                {link.label}
                                            </div>
                                        </>

                                    ) : (
                                        <>
                                            <div>
                                                {link.label}
                                            </div>
                                            <div>
                                                <CloseIcon />
                                            </div>
                                        </>
                                    )
                                    }
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};