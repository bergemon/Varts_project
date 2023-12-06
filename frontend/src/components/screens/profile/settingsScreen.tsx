import { BaseInput } from "@/components/UI/baseInput";
import { Combobox, Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";

const optionsLang = [
    { label: "Русский", value: "ru" },
    { label: "English", value: "en" }
]

export const SettingsScreen = () => {
    const [selected, setSelected] = useState(optionsLang[0])
    return (
        <div className="mt-10">
            <div className="flex gap-[50px] px-[30px]">
                <div >
                    <Image src="/assets/images/profile_avatar.png" width={140} height={140} alt="аватар" />
                </div>
                <div className="flex flex-col gap-7">
                    <BaseInput width="350xl" flex="flex items-center justify-between" label="Имя" value="Алиса Петрова" color="form" />
                    <BaseInput width="350xl" flex="flex items-center justify-between" label="День рождения" value="15 / 05 / 2006" color="form" />
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray placeholder:text-gray font-semibold">Язык</label>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1 w-[350px]">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate text-black">{selected.label}</span>
                                    <span className="pointer-events-none text-black absolute inset-y-0 right-0 flex items-center pr-2">
                                        ''
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {optionsLang.map((person, personIdx) => (
                                            <Listbox.Option
                                                key={personIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={person}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {person.label}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">

                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </div>
            </div>
        </div>
    );
};