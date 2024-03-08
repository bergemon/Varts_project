import React, { useMemo } from "react";
import Select, {
    ActionMeta,
    GroupBase,
    OptionsOrGroups,
} from "react-select";
import AsyncSelect from 'react-select/async';
import { customStyles } from "@/styles/react-select";


type Props = {
    label?: string;
    error?: any;
    value?: any;
    placeholder?: string;
    onChange?: ((newValue: any, actionMeta: ActionMeta<any>) => void) | undefined
    handleSearch?: (e: any) => void;
    isClearable?: boolean;
    isMulti?: boolean;
    isSearchable?: boolean;
    allOptions?: string[][];
    defaultValue?: boolean;
}

export const BaseSelect = React.forwardRef(
    ({ label, error, isClearable, value, defaultValue, placeholder = "", onChange, handleSearch, isMulti, isSearchable, allOptions, ...props }: Props, ref: any) => {
        const options: OptionsOrGroups<any, GroupBase<unknown>> | undefined =
            useMemo(
                () =>
                    allOptions && allOptions
                        .map(option => {
                            return {
                                value: option[0],
                                label: option[1]
                            };
                        }),
                [allOptions]
            );

        return (
            <div className={`flex flex-col relative min-w-[150px]`}>
                {label && <label className="text-sm text-white font-semibold">{label}</label>}
                {options && <Select
                    placeholder={placeholder}
                    id="long-value-select"
                    instanceId="long-value-select"
                    styles={customStyles}
                    isClearable={isClearable}
                    defaultValue={options[0]}
                    options={options}
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    isMulti={isMulti}
                    isSearchable={isSearchable}
                    {...props}
                />}
                {error &&
                    <p className="absolute text-xs -bottom-8 text-red-500">{error}</p>
                }
            </div>
        )
    }
);

BaseSelect.displayName = "BaseSelect";