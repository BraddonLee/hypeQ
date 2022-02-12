import React, { useState, useEffect, createContext, useContext, useRef } from "react";

function TypeDropdown() {
    const [selectedType, setSelectedType] = useState("")
    const [dropdownSearchValue, setDropdownSearchValue] = useState("")
    const [editMode, setEditMode] = useState(false)
    const dropdownRef = useRef()

    const types = [
        'reset',
        'Podcast',
        'Show',
        'Movie',
        'Video'
    ];
    /**
     Close the dropdown when clicked outside
     Refer https://www.codingdeft.com/posts/react-on-click-outside/ for details
     */

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu, then close the menu
            if (
                editMode &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setEditMode(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [editMode])

    const typeSelectionHandler = type => {
        setSelectedType(type)
        setDropdownSearchValue("")
        setEditMode(false)
    }

    const filteredTypes = types.filter(type =>
        type.match(new RegExp(dropdownSearchValue, "i"))
    )

    return (
        <div>
            {editMode ? (
                // display the dropdown when the select us focused
                <div ref={dropdownRef} className="dropdown-wrapper">
                    <select
                        className="dropdown-select"
                        name="dropdown-select"
                        autoFocus onChange={e => setDropdownSearchValue(e.target.value)}
                        value={dropdownSearchValue}
                    />
                    <div className="dropdown-list">
                        <ul>
                            {filteredTypes.map(type => {
                                return (
                                    <li key={type} onClick={() => typeSelectionHandler(type)}>
                                        {type}{" "}
                                    </li>
                                )
                            })}
                            {filteredTypes.length === 0 && (
                                <li className="no-result">No results found</li>
                            )}
                        </ul>
                    </div>
                </div>
            ) : (
                <select
                    // Grey out the text when "Select Primary time" select hint is shown
                    className={`dropdown-search ${!(dropdownSearchValue || selectedType) && "default"
                        }`}
                    onFocus={() => setEditMode(true)}
                    // Display the selected time
                    value={selectedType || "select type"}
                />
            )}
        </div>
    )
}

export default TypeDropdown;