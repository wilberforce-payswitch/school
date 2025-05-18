/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { InputField, DateField, CheckboxField, Button } from '@/components/SettingsFormElement';
import { useCreateAcademicYearMutation } from '@/state/api';
import { useAppSelector } from '@/app/redux';

interface AcademicYearForm {
  name: string;
  startDate: string;
  endDate: string;
  schoolId?: string;
  isCurrent: boolean;
}

interface FormErrors {
  name?: string;
  startDate?: string;
  endDate?: string;
  schoolId?: string;
  dateRange?: string;
}

const AcademicYearTab: React.FC = () => {
  const [formData, setFormData] = useState<AcademicYearForm>({
    name: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const schoolId = useAppSelector((state) => state.global.auth?.user?.school.id)

  const [createAcademicYear] = useCreateAcademicYearMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors({ ...errors, [id]: undefined });
    }
    // Clear date range error when changing dates
    if ((id === 'startDate' || id === 'endDate') && errors.dateRange) {
      setErrors({ ...errors, dateRange: undefined });
    }
    // Clear success message when user makes changes
    if (success) setSuccess('');
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Academic year name is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.dateRange = 'End date must be after start date';
    }
    
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const payload = {
      school_id: schoolId,
      name: formData.name,
      start_date: formData.startDate,
      end_date: formData.endDate,
      is_current: formData.isCurrent,
    };

    const res = await createAcademicYear(payload).unwrap();

    setSuccess(`Academic year "${res.academic_year.name}" created successfully!`);
    setFormData({
      name: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
    });
    setErrors({});
  } catch (err: any) {
    setErrors({ name: err?.data?.message || 'Failed to create academic year' });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="animate-fadeIn justify-center items-center">
      <h2 className="text-xl font-semibold mb-4 text-purple-500">Create Academic Year</h2>
      <p className="text-gray-600 mb-6">
        Add a new academic year.
      </p>
      
      {success && (
        <div className="mb-4 p-2 bg-green-50 border border-green-200 text-green-600 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 mx-auto w-[70%]">
        <InputField
          label="Academic Year Name"
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="e.g., 2025-2026"
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateField
            label="Start Date"
            id="startDate"
            value={formData.startDate}
            onChange={handleChange}
            error={errors.startDate}
            required
          />
          
          <DateField
            label="End Date"
            id="endDate"
            value={formData.endDate}
            onChange={handleChange}
            error={errors.endDate}
            required
          />
        </div>
        
        {errors.dateRange && (
          <p className="mt-1 text-sm text-red-500">{errors.dateRange}</p>
        )}
        
        <CheckboxField
          label="Set as current academic year"
          id="isCurrent"
          checked={formData.isCurrent}
          onChange={handleChange}
        />
        
        <div className="pt-2">
          <Button 
            type="submit" 
            color="purple"
            disabled={isSubmitting}
            className="transform transition-transform hover:scale-[1.02] active:scale-[0.98] duration-200"
          >
            {isSubmitting ? 'Creating Academic Year...' : 'Create Academic Year'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcademicYearTab;