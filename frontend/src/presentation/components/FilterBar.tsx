import React from 'react';
import Dropdown from './Dropdown';
import ActiveFilters, { type ActiveFilter } from './ActiveFilters';

interface DropdownConfig {
    id: string;
    options: Array<{ label: string; value: string }>;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    flex?: number;
}

interface CustomElementConfig {
    id: string;
    element: React.ReactNode;
    flex?: number;
}

interface SearchConfig {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    flex?: number;
}

interface FilterBarProps {
    search?: SearchConfig;
    dropdowns?: DropdownConfig[];
    customElements?: CustomElementConfig[];
    activeFilters?: ActiveFilter[];
    onClearAll?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    search,
    dropdowns = [],
    customElements = [],
    activeFilters = [],
    onClearAll
}) => {
    return (
        <div className="w-full flex flex-col bg-white rounded-xl shadow-sm px-6 py-4 gap-4">
            <div className="w-full flex flex-row items-center gap-4">
                {search && (
                    <div style={{ flex: search.flex || 2 }}>
                        <div className="w-full flex gap-4 items-center rounded-xl">
                            <input
                                type="text"
                                value={search.value}
                                onChange={(e) => search.onChange(e.target.value)}
                                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none"
                                placeholder={search.placeholder || "Buscar..."}
                            />
                        </div>
                    </div>
                )}

                {dropdowns.map((dropdown) => (
                    <div key={dropdown.id} style={{ flex: dropdown.flex || 1 }}>
                        <Dropdown
                            options={dropdown.options}
                            value={dropdown.value}
                            onChange={dropdown.onChange}
                            placeholder={dropdown.placeholder}
                        />
                    </div>
                ))}

                {customElements.map((custom) => (
                    <div key={custom.id} style={{ flex: custom.flex || 1 }}>
                        {custom.element}
                    </div>
                ))}
            </div>

            {activeFilters.length > 0 && (
                <div className="w-full pt-2 border-t border-gray-200 transition-all duration-300 ease-in-out">
                    <ActiveFilters
                        filters={activeFilters}
                        onClearAll={onClearAll}
                    />
                </div>
            )}
        </div>
    );
};

export default FilterBar;
