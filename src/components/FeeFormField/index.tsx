import React, { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  required = false,
  children,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;