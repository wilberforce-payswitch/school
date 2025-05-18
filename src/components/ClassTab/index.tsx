import React, { useState } from 'react';
import { InputField, Button } from '@/components/SettingsFormElement';
import { useCreateClassMutation } from '@/state/api';
import { useAppSelector } from '@/app/redux';
import toast, { Toaster } from "react-hot-toast";

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
   const userSchoolId = useAppSelector(
      (state) => state?.global?.auth?.user?.school?.id
    );
  
  const [errors, setErrors] = useState<FormErrors>({});
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

  const [createClass, { isLoading: creatingClass }] = useCreateClassMutation();

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

 const handleCreateClass = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     if(!validateForm) return;
     
     try {
       const response = await createClass({
         name: formData.className,
         school_id: userSchoolId,
       });
       if (response.data?.message) {
         toast.success(response?.data?.message);
       }
       setFormData({
        className: '',
        schoolId: '',
       });
      
       console.log("response", JSON.stringify(response, null, 3));
     } catch (error) {
       console.log("error from registration", error);
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
      
      <form onSubmit={handleCreateClass} className="space-y-4 max-w-xl mx-auto">
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
            disabled={creatingClass}
            className="group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              {creatingClass ? 'Creating Class...' : 'Create Class'}
            </span>
          </Button>
        </div>
      </form>
        <Toaster toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default ClassTab;