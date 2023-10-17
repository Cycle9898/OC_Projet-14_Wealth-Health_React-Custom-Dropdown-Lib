import { useEffect,useState,useRef,useCallback } from "react";
import type { DropdownProps,OptionType } from "../types/Dropdown";
import { FaCaretDown,FaCaretUp } from "react-icons/fa6";

/**
 * @description
 * React component that render a customizable drop-down list
 * 
 * @param displayedValue - Default value (for exemple from the parent component's local state)
 * that appear first on the dropdown list when no option was chosen.
 * Afterwards, it will contain the chosen value in the list.
 * @param setDisplayedValue - setState method (for exemple from the parent component's local state) to update displayedValue.
 * @param optionArray - An array of objects, with an id and a value properties, that represent all the available options in the dropdown list
 * 
 * @returns JSX element
 */
export function Dropdown({ displayedValue,setDisplayedValue,optionArray }: DropdownProps) {
    // Handle dropdown list opening
    const [isOpen,setIsOpen] = useState<boolean>(false);

    const toggleIsOpen = (event: React.MouseEvent<HTMLDivElement,MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        setIsOpen((previousState: boolean) => !previousState);
        event.stopPropagation();
    };

    const handleKeyPresses = (event: React.KeyboardEvent<HTMLDivElement>) => {
        (event.key === "Enter" || event.key === " ") && toggleIsOpen(event);
        event.key === "Escape" && setIsOpen(false);

        if (optionArray.length > 0) {
            changeDisplayedValueWithSomeKeys(event);
        }
    };

    const validateOptionWithKeyboard = (event: React.KeyboardEvent<HTMLLIElement>,option: OptionType) => {
        (event.key === "Enter" || event.key === " ") && setDisplayedValue(option.value)
    };

    // Function that deactivate keyboard navigation when the dropdown list is focused
    const deactivateScrolling = (event: KeyboardEvent) => {
        // Conditions
        const isNavigationKeyPressed: boolean = ["ArrowUp","ArrowDown","Home","End"," "].includes(event.key);

        const isDropdownTargeted: boolean = event.target === dropdownValueRef.current ||
            liElementRef.current.includes(event.target as HTMLLIElement);

        // Deactivate navigation with keyboard when it's necessary
        if ((isDropdownTargeted && isNavigationKeyPressed) || (isOpen && event.key === "Tab")) {
            event.preventDefault();
        }
    };

    // Cache deactivateScrolling function definition with useCallback
    const cachedDeactivateScrolling = useCallback(deactivateScrolling,[isOpen]);

    // Change displayed value with up and down arrow keys
    const changeDisplayedValueWithSomeKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const currentIndex: number = optionArray.findIndex((option => option.value === displayedValue));

        const changeToPreviousOption = () => {
            if (currentIndex === 0 || currentIndex === -1) {
                setDisplayedValue(optionArray[optionArray.length - 1].value);
            } else {
                setDisplayedValue(optionArray[currentIndex - 1].value);
            }
        }

        const changeToNextOption = () => {
            if (currentIndex === (optionArray.length - 1)) {
                setDisplayedValue(optionArray[0].value);
            } else {
                setDisplayedValue(optionArray[currentIndex + 1].value);
            }
        }

        switch (event.key) {
            case "Tab":
                if (isOpen && !event.shiftKey) {
                    changeToNextOption();
                } else if (isOpen && event.shiftKey) {
                    changeToPreviousOption();
                }
                break;
            case "ArrowUp":
                changeToPreviousOption();
                break;
            case "ArrowDown":
                changeToNextOption();
                break;
            case "Home":
                setDisplayedValue(optionArray[0].value);
                break;
            case "End":
                setDisplayedValue(optionArray[optionArray.length - 1].value);
                break;
        }
    }

    // Refs
    const dropdownRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const dropdownValueRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
    const liElementRef: React.MutableRefObject<HTMLLIElement[]> = useRef([]);

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

        // When dropdown list is open, focus automatically on the previously chosen element (if any)
        if (isOpen) {
            const currentLiElement = liElementRef.current.find(element => element?.innerText === displayedValue);
            currentLiElement?.focus();
        }

        // Check if a click is made outside of the dropdown list and close it
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("click",(event) => handleClickOutside(event));

        // Deactivate keyboard navigation inside the browser's window when it's necessary
        window.addEventListener("keydown",cachedDeactivateScrolling);

        return () => {
            // Clean up event listeners
            document.removeEventListener("click",(event) => handleClickOutside(event));
            window.removeEventListener("keydown",cachedDeactivateScrolling);
        }
    },[displayedValue,setDisplayedValue,optionArray,isOpen,cachedDeactivateScrolling]);

    return (
        <div className="rcdc-dropdown-wrapper"
            ref={dropdownRef}
            onClick={(event: React.MouseEvent<HTMLDivElement,MouseEvent>) => toggleIsOpen(event)}
            onKeyUp={(event: React.KeyboardEvent<HTMLDivElement>) => handleKeyPresses(event)}
        >
            <div className="rcdc-dropdown-value-container"
                ref={dropdownValueRef}
                tabIndex={0}
                role="combobox"
                aria-label="Choose an option from the dropdown list"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className="rcdc-dropdown-value-text">{displayedValue}</span>

                {isOpen ? (
                    <FaCaretUp className="rcdc-dropdown-value-logo"
                        aria-label="Close dropdown list"
                    />
                ) : (
                    <FaCaretDown className="rcdc-dropdown-value-logo"
                        aria-label="Open dropdown list"
                    />
                )}
            </div>

            {isOpen &&
                <ul className="rcdc-dropdown-list"
                    role="listbox"
                >
                    {optionArray.map((option,index) => {
                        return (
                            <li key={option.id}
                                className="rcdc-dropdown-option"
                                tabIndex={0}
                                role="option"
                                aria-selected={option.value === displayedValue}
                                ref={(liElement: HTMLLIElement) => liElementRef.current[index] = liElement}
                                onClick={() => setDisplayedValue(option.value)}
                                onKeyDown={(event: React.KeyboardEvent<HTMLLIElement>) => validateOptionWithKeyboard(event,option)}
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