import { useAppSelector } from '@/app/redux';
import { useGetSchoolTransactionHistoryQuery } from '@/state/api';
import { Search } from 'lucide-react';
import React, { useState } from 'react';

const AdminPaymentTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const schoolId = useAppSelector((state) => state.global.auth?.user?.school.id)
  const { data, isLoading, isError } = useGetSchoolTransactionHistoryQuery({school_id: schoolId, page, search,});

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading payments</p>;
  const payments = data?.data;
  const currentPage = data?.current_page;
  const lastPage = data?.last_page;

  return (
    <div className="px-10 py-5">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
           <Search color='gray' />
            </div>
            <input
              type="text"
              id="table-search"
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); 
              }}
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
              placeholder="Search for payments"
            />
          </div>
        </div>

       
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Payment ID</th>
              <th className="px-6 py-3">Transaction ID</th>
              <th className="px-6 py-3">Term Name</th>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Class Name</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Payment Date</th>
              
            </tr>
          </thead>
          <tbody>
            {payments.map((payment: any) => (
              <tr
                key={payment.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{payment.id}</td>
                <td className="px-6 py-4">{payment.transaction_id}</td>
                <td className="px-6 py-4">{payment.termName}</td>
                <td className="px-6 py-4">{payment.studentName}</td>
                <td className="px-6 py-4">{payment.className}</td>
                <td className="px-6 py-4">${payment.amount}</td>
                <td className="px-6 py-4">{payment.status}</td>
                <td className="px-6 py-4">{new Date(payment.paymentDate).toLocaleString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{lastPage}</span>
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, lastPage))}
            disabled={currentPage === lastPage}
            className={`px-4 py-2 border ${
              currentPage === lastPage
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminPaymentTable;
