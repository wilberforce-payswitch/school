import React, { useState } from 'react';
import { InputField, Button } from '@/components/SettingsFormElement';

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const PasswordTab: React.FC = () => {
  const [formData, setFormData] = useState<PasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
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
    
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        setSuccess('Password updated successfully!');
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }, 1500);
    }
  };

  return (
    <div className="animate-fadeIn justify-center items-center">
      <h2 className="text-xl font-semibold mb-4 text-blue-500">Change Password</h2>
      <p className="text-gray-600 mb-6">
        Update your password to keep your account secure.
      </p>
      
      {success && (
        <div className="mb-4 p-2 bg-green-50 border border-green-200 text-green-600 rounded">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
        <InputField
          label="Current Password"
          id="currentPassword"
          type="password"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          required
        />
        
        <InputField
          label="New Password"
          id="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          required
        />
        
        <InputField
          label="Confirm New Password"
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        
        <div className="pt-2">
          <Button 
            type="submit" 
            color="blue"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating Password...' : 'Update Password'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PasswordTab;