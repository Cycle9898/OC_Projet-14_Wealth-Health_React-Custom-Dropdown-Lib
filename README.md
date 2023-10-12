# React Custom Dropdown Component

This library is used to import a custom dropdown list React component.

![Dropdown image 1](https://raw.githubusercontent.com/Cycle9898/OC_Projet-14_Wealth-Health_React-Custom-Dropdown-Lib/main/doc-images/dropdown_1.png)

![Dropdown image 2](https://raw.githubusercontent.com/Cycle9898/OC_Projet-14_Wealth-Health_React-Custom-Dropdown-Lib/main/doc-images/dropdown_2.png)

![Dropdown image 3](https://raw.githubusercontent.com/Cycle9898/OC_Projet-14_Wealth-Health_React-Custom-Dropdown-Lib/main/doc-images/dropdown_3.png)

The component respects the common accessibility rules (WAI-ARIA).

Users can interact with the dropdown list with a mouse (clicks) and/or a keyboard :
* **Tab** OR **Down Arrow**: Choose the next option and validate it
* **Shift + Tab** OR **Up Arrow**: Choose the previous option and validate it
* **Enter** OR **Space Bar**: Open/close the dropdown list and choose the focused option
* **Escape**: Close the dropdown list
* **Home**: Automatically choose the first option in the dropdown list
* **End**: Automatically choose the last option in the dropdown list

## Getting Started

### Prerequisites

The project need the [React library](https://react.dev/) to work.

*React V18.2.0* and *React-dom V18.2.0* are required.

React's docs advise to use controlled components, so this custom component also need a React state variable
and its setState method to work (see Props in Component customization section).

### Instructions

1. Add the library to the project with a package manager (yarn for exemple):

```bash
yarn add @cycle9898/react-custom-dropdown-component
```

2. Import the React component in a .jsx or .tsx file (types definitions are included):

```JSX
import {Dropdown } from "@cycle9898/react-custom-dropdown-component";
```

3. Use the component:

```JSX
function ExempleComponent() {
   return (
      <form>
         <Dropdown displayedValue={displayedValue}
                    setDisplayedValue={setDisplayedValue}
                    optionArray={optionList} />
      </form>
   );
}
```

## Component customization

### Props

This component have 3 main props:

* **DisplayedValue**:

It is a state variable, from the parent component's local state or the app's global state for exemple.

Additionally, it appears in the closed drop-down list when no options have been chosen.

Afterwards, it will store the value from the chosen option from the list.

* **setDisplayedValue**:

It is a setState method, from the parent component's local state or the app's global state for exemple,
that will update the displayedValue state variable.

* **optionArray**:

It is an array of objects, with an id (type: string) and a value (type: string) properties,
that represent all the available options in the dropdown list.

The ID's must be unique, otherwise the component will throw an error.

### Modify the style with CSS

There are some HTML classes that can be used to change the style of dropdown list's elements:

* **rcdc-dropdown-wrapper** class:

This class is applied to the dropdown list container.

* **.rcdc-dropdown-value-container** class:

This class is applied to displayed value container.

The border color or border radius can be changed with the corresponding CSS properties and this class.

With the ":focus" pseudo-class, the outline style can also be modified.

* **.rcdc-dropdown-value-text** class:

This class is applied to the span tag of .rcdc-dropdown-value-container element and contain the displayedValue string.

* **.rcdc-dropdown-value-logo** class:

This class is applied to the arrow icons. Its style can be changed like any [Font Awesome](https://fontawesome.com/) icons.

The "color" and "font-size" CSS properties to change its color and size, for exemple.

* **.rcdc-dropdown-list** class:

This class is applied to the "ul" HTML tag that contains all the options.

The border color or border radius can be changed with the corresponding CSS properties and this class.

* **.rcdc-dropdown-option** class:

This class is applied to the "li" HTML tag that represent an option.

With ":hover" and ":focus" pseudo-classes and "background-color" or "color" CSS properties,
the background color or text color can be changed when an option is hovered or focused.
