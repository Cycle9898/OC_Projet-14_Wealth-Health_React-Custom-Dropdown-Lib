import { useEffect,useState } from "react";
import type { DropdownProps } from "../types/Dropdown";
import { FaCaretDown,FaCaretUp } from "react-icons/fa6";

/**
 * @description
 * React component that render a customizable drop-down list
 * 
 * @param title - optional : title, default value, that appear first on the dropdown list when no option was chosen
 * Otherwise, the first option (or empty string if there is none) will appear
 * @param optionArray - An array of objects, with an id and a value, that represent all the available options in the dropDown
 * 
 * @returns JSX element
 */
export function Dropdown({ displayedValue,setDisplayedValue,optionArray }: DropdownProps) {
    // Handle dropdown list opening
    const [isOpen,setIsOpen] = useState<boolean>(false);

    const toggleIsOpen = () => setIsOpen((previousState: boolean) => !previousState);

    // Check if optionArray's objects have unique id property
    const optionIdArray: string[] = optionArray.map(option => option?.id);
    const isOptionIdsNotUnique: boolean = optionIdArray.length !== new Set(optionIdArray).size;

    if (isOptionIdsNotUnique) {
        throw new Error("Option ID's must be unique !");
    }

    useEffect(() => {
        // Replace displayedValue by the first element of optionArray when it's necessary
        if (displayedValue === "" && optionArray.length > 0) {
            setDisplayedValue(optionArray[0].value);
        }
    },[displayedValue,setDisplayedValue,optionArray]);

    return (
        <div className="rcdc-dropdown-wrapper"
            onClick={toggleIsOpen}
        >
            <div className="rcdc-dropdown-value">
                <span>{displayedValue}</span>

                {isOpen ?
                    <FaCaretUp />
                    :
                    <FaCaretDown />
                }
            </div>

            {isOpen &&
                <ul className="rcdc-dropdown-list">
                    {optionArray.map(option => {
                        return (
                            <li key={option.id}
                                className="rcdc-dropdown-option"
                                onClick={() => setDisplayedValue(option.value)}
                            >
                                {option.value}
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );
}