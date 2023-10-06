/* Dropdown component types */

export type DropdownProps = {
    displayedValue: string,
    setDisplayedValue: React.Dispatch<React.SetStateAction<string>>,
    optionArray: OptionType[]
}

export type OptionType = {
    id: string,
    value: string
}