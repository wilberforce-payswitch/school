import Select, { components, SingleValue } from "react-select";
import { useState } from "react";
import ArrowDown from '@/assets/icons/arrow-down-icon.svg';
import Image from "next/image";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  onChange: (value: string) => void;
  caption: string;
  options: Option[];
  defaultValue?: string;
  placeholder?: string;
  value?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  onChange,
  caption,
  options,
  defaultValue,
  placeholder = "Select...",
  value,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const DropdownIndicator = (props: any) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          <Image
            src={ArrowDown}
            alt="Chevron Icon"
            width={16}
            height={16}
          />
        </components.DropdownIndicator>
      )
    );
  };

  const selectedValueOption = options.find((option) => option.value === value);

  return (
    <div className="relative w-full">
      {caption && (
        <label
          htmlFor={caption}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {caption}
        </label>
      )}
      <Select
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#247EFC" : "#E5E7EB",
            boxShadow: state.isFocused ? "0 0 0 1px #247EFC" : "none",
            "&:hover": {
              borderColor: "#247EFC",
            },
            minHeight: "40px",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected
              ? "#247EFC"
              : state.isFocused
              ? "#F3F4F6"
              : "white",
            color: state.isSelected ? "white" : "#1F2937",
          }),
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator,
        }}
        className="basic-single text-sm"
        classNamePrefix="select"
        isSearchable={true}
        name="Switch"
        options={options}
        defaultValue={options.find((option) => option.value === defaultValue)}
        value={selectedValueOption}
        placeholder={placeholder}
        onChange={(newValue: SingleValue<{ label: string; value: string }>) => {
          const value = newValue ? newValue.value : "";
          setSelectedOption(value);
          onChange(value);
        }}
      />
    </div>
  );
};

export default CustomDropdown;
