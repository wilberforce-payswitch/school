import React from 'react'


const SuccessfulTransactionCard = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center">
          <svg
            className="w-20 h-20 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm5.707 7.293a1 1 0 0 0-1.414-1.414L10 14.172l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l6-6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mt-2">
          Your payment has been processed successfully.
        </p>
        <button
          
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default SuccessfulTransactionCard