import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  
  // Classes customizáveis para controle total
  containerClassName?: string;
  buttonClassName?: string;
  buttonActiveClassName?: string;
  menuClassName?: string;
  optionClassName?: string;
  optionActiveClassName?: string;
  optionSelectedClassName?: string;
  optionDisabledClassName?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Selecione',
  disabled = false,
  containerClassName = '',
  buttonClassName = 'w-[200px] px-4 py-2 text-left bg-white border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
  buttonActiveClassName = 'ring-2 ring-blue-500',
  menuClassName = 'absolute z-10 w-[200px] mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto',
  optionClassName = 'px-4 py-2 cursor-pointer hover:bg-gray-100',
  optionActiveClassName = 'bg-gray-100',
  optionSelectedClassName = 'bg-blue-50 text-blue-600 font-medium',
  optionDisabledClassName = 'opacity-50 cursor-not-allowed',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Encontra a opção selecionada
  const selectedOption = options.find(opt => opt.value === value);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navegação por teclado
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => {
            const nextIndex = prev < options.length - 1 ? prev + 1 : prev;
            // Pula opções desabilitadas
            if (options[nextIndex]?.disabled) {
              return nextIndex < options.length - 1 ? nextIndex + 1 : prev;
            }
            return nextIndex;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => {
            const nextIndex = prev > 0 ? prev - 1 : prev;
            // Pula opções desabilitadas
            if (options[nextIndex]?.disabled) {
              return nextIndex > 0 ? nextIndex - 1 : prev;
            }
            return nextIndex;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && !options[highlightedIndex]?.disabled) {
            onChange(options[highlightedIndex].value);
            setIsOpen(false);
            setHighlightedIndex(-1);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, options, onChange]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setHighlightedIndex(-1);
      }
    }
  };

  const handleSelect = (option: DropdownOption) => {
    if (!option.disabled) {
      onChange(option.value);
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${containerClassName}`}>
      {/* Botão do dropdown */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          flex items-center justify-between
          ${buttonClassName}
          ${isOpen ? buttonActiveClassName : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span className="flex items-center gap-2">
          {selectedOption?.icon}
          <span>{selectedOption?.label || placeholder}</span>
        </span>
        
        {/* Ícone de seta */}
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Menu do dropdown */}
      {isOpen && (
        <div className={menuClassName}>
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isHighlighted = index === highlightedIndex;

            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`
                  flex items-center gap-2
                  ${optionClassName}
                  ${isHighlighted ? optionActiveClassName : ''}
                  ${isSelected ? optionSelectedClassName : ''}
                  ${option.disabled ? optionDisabledClassName : ''}
                `}
                onMouseEnter={() => !option.disabled && setHighlightedIndex(index)}
              >
                {option.icon}
                <span>{option.label}</span>
                {isSelected && (
                  <svg
                    className="w-5 h-5 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;