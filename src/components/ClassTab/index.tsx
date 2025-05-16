import React, { useState } from 'react';
import { InputField, Button } from '@/components/SettingsFormElement';

interface ClassForm {
  className: string;
  schoolId: string;
}

interface FormErrors {
  className?: string;
  schoolId?: string;
}

const ClassTab: React.FC = () => {
  const [formData, setFormData] = useState<ClassForm>({
    className: '',
    schoolId: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors({ ...errors, [id]: undefined });
    }
    // Clear success message when user makes changes
    if (success) setSuccess('');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.className.trim()) {
      newErrors.className = 'Class name is required';
    }
    
    if (!formData.schoolId.trim()) {
      newErrors.schoolId = 'School ID is required';
    } else if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(formData.schoolId)) {
      newErrors.schoolId = 'Please enter a valid UUID format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(`Class "${formData.className}" created successfully!`);
        setFormData({
          className: '',
          schoolId: '',
        });
      }, 1500);
    }
  };

  return (
    <div className="animate-fadeIn justify-center items-center">
      <h2 className="text-xl font-semibold mb-4 text-blue-500">Create Class</h2>
      <p className="text-gray-600 mb-6">
        Create a new class
      </p>
      
      {success && (
        <div className="mb-4 p-2 bg-green-50 border border-green-200 text-green-600 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl mx-auto">
        <InputField
          label="Class Name"
          id="className"
          type="text"
          value={formData.className}
          onChange={handleChange}
          error={errors.className}
          placeholder="e.g., Grade 10A"
          required
        />
        
        
        <div className="pt-2">
          <Button 
            type="submit" 
            color="blue"
            disabled={isSubmitting}
            className="group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              {isSubmitting ? 'Creating Class...' : 'Create Class'}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ClassTab;