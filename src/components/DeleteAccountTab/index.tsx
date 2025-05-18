import React, { useState } from 'react';
import { Button } from '@/components/SettingsFormElement';

const DeleteAccountTab: React.FC = () => {
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleDeleteRequest = () => {
    setShowConfirmation(true);
  };
  
  const handleConfirmDelete = () => {
    if (confirmText !== 'DELETE') return;
    
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      // In a real app, you would log the user out and redirect
      alert('Account has been deleted');
    }, 2000);
  };
  
  const handleCancel = () => {
    setShowConfirmation(false);
    setConfirmText('');
  };

  return (
    <div className="animate-fadeIn justify-center items-center flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-red-500">Delete Account</h2>
      
      {!showConfirmation ? (
        <>
          <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium text-red-800 mb-2">Warning: This action cannot be undone</h3>
            <p className="text-red-700 mb-2">
              Deleting your account will permanently remove all of your data from our system, including:
            </p>
            <ul className="list-disc list-inside text-red-700 space-y-1 mb-2">
              <li>All personal information</li>
              <li>Classes and student records</li>
              <li>Academic year data</li>
              <li>System preferences and settings</li>
            </ul>
            <p className="text-red-700">
              Please make sure you have backed up any important data before proceeding.
            </p>
          </div>
          
          <Button 
            color="red"
            onClick={handleDeleteRequest}
            className="hover:bg-red-600 transition-colors duration-300 max-w-2xl"
          >
            Delete Account
          </Button>
        </>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-800 font-medium">
            To confirm deletion, please type &quot;DELETE&quot; in the field below:
          </p>
          
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            placeholder="Type DELETE to confirm"
          />
          
          <div className="flex space-x-4 pt-2">
            <Button 
              color="red"
              onClick={handleConfirmDelete}
              disabled={confirmText !== 'DELETE' || isDeleting}
              className="flex-1"
            >
              {isDeleting ? 'Deleting Account...' : 'Confirm Delete Account'}
            </Button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountTab;