"use client";

import React, { useMemo } from 'react'
import { SingleValue } from "react-select";
import CreateableSelect from "react-select/creatable";

type Props = {
    value?: string | null | undefined;
    options?: { label: string, value: string }[];
    disabled?: boolean;
    placeholder?: string;
    onChange: (value: string) => void;
    onCreate?: (value: string) => void;
}

const Select = ({
    value,
    onChange,
    disabled,
    onCreate,
    options = [],
    placeholder
}: Props) => {

    const onSelect = (
        option: SingleValue<{ label: string, value: string }>
    ) => {
        if (!option) {
            return null;
        }
        onChange(option.value);
    };

    const formattedValue = useMemo(() => {
        return options.find((option) => option.value === value);
    }, [options, value])

    return (
        <CreateableSelect
            placeholder={placeholder}
            className='text-sm h-10'
            styles={{
                control: (base) => ({
                    ...base,
                    borderColor: "#e2e8f0",
                    "hover": {
                        borderColor: "#e2e8f0",
                    },
                })
            }}
            value={formattedValue}
            onChange={onSelect}
            options={options}
            onCreateOption={onCreate}
            isDisabled={disabled}
        />
    )
}

export default Select