import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

interface Option {
  id: string;
  name: string;
}

interface MultiSelectProps {
  id: string;
  options: Option[];
  selectedOptions: Option[];
  onChange: (selected: Option[]) => void;
  placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  options,
  selectedOptions,
  onChange,
  placeholder = 'Select options...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (option: Option) => {
    const isSelected = selectedOptions.some(selected => selected.id === option.id);
    
    if (isSelected) {
      onChange(selectedOptions.filter(selected => selected.id !== option.id));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  const removeOption = (event: React.MouseEvent, optionId: string) => {
    event.stopPropagation();
    onChange(selectedOptions.filter(selected => selected.id !== optionId));
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 cursor-pointer min-h-[42px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {selectedOptions.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            selectedOptions.map(option => (
              <span
                key={option.id}
                className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {option?.name}
                <button
                  type="button"
                  onClick={(e) => removeOption(e, option.id)}
                  className="ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => {
            const isSelected = selectedOptions.some(selected => selected.id === option.id);
            return (
              <div
                key={option.id}
                className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 ${
                  isSelected ? 'bg-indigo-50' : ''
                }`}
                onClick={() => toggleOption(option)}
              >
                <span className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}>
                  {option.name}
                </span>
                {isSelected && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedOptions.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">
            Selected classes ({selectedOptions.length}):
            <span className="font-medium ml-1">
              {selectedOptions.map(option => option.name).join(', ')}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;