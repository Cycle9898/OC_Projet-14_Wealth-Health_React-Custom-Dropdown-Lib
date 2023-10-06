import { useState } from 'react';
import { Dropdown } from '../lib/main';
import { departments,states } from './data/mockedDataForDropdowns';

/**
 * @description
 * React component to test Dropdown component from react-custom-dropdown-component lib
 * 
 * @returns JSX element
 */
function TestComponent() {
    // useState hook to handle dropdown lists' value inside the form
    const [ddl1Value,setDdl1Value] = useState<string>("");
    const [ddl2Value,setDdl2Value] = useState<string>("Choose a department");
    const [ddl3Value,setDdl3Value] = useState<string>("");

    return (
        <div className="dropdown-container">
            <form className="dropdown-form" action="#">
                <Dropdown displayedValue={ddl1Value}
                    setDisplayedValue={setDdl1Value}
                    optionArray={states} />

                <Dropdown displayedValue={ddl2Value}
                    setDisplayedValue={setDdl2Value}
                    optionArray={departments} />

                <Dropdown displayedValue={ddl3Value}
                    setDisplayedValue={setDdl3Value}
                    optionArray={[]} />

                <select name="departments" id="departments-select">
                    {departments.map(department => <option key={department.id} value={department.value}>{department.value}</option>)}
                </select>
            </form>
        </div>
    );
}

export default TestComponent;