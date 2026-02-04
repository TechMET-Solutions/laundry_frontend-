import { useEffect, useRef, useState } from "react";

const SearchSelectInput = ({
    value,
    placeholder = "Search...",
    icon: Icon,
    items = [],
    isLoading = false,
    displayKey = "name",
    onSearchChange,
    onSelect,
}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    // close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            {/* INPUT */}
            <div
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 bg-[#E1E3F3] rounded-lg p-2 cursor-pointer"
            >
                {Icon && <Icon className="text-gray-600" />}

                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    onFocus={() => setOpen(true)}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-[#E1E3F3] text-[12px] outline-none font-medium"
                />
            </div>

            {/* DROPDOWN */}
            {open && (
                <ul className="absolute left-0 top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 max-h-48 overflow-auto">
                    {isLoading && (
                        <li className="p-2 text-sm text-gray-400">
                            Searching...
                        </li>
                    )}

                    {!isLoading && items.length === 0 && (
                        <li className="p-2 text-sm text-gray-400">
                            No results found
                        </li>
                    )}

                    {!isLoading &&
                        items.map((item) => (
                            <li
                                key={item.id}
                                className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    onSelect(item);
                                    setOpen(false);
                                }}
                            >
                                {item[displayKey]}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
};

export default SearchSelectInput;
