import { paymentStatusStatistics } from '@/types'
import React from 'react'

type prop = {
    transactions: paymentStatusStatistics 
}

const SuperAdminHome = ({transactions}: prop) => {

  return (
    <div className="w-full h-full bg-[#FBFDFF] p-4">
    <div className="w-full flex flex-row gap-5">
      <div className="mb-4 p-4 py-10 bg-[#27AE601A] rounded-lg w-full border border-[#27AE604D]">
        <h2 className="text-xl font-[700] text-[#0EAD69]">{transactions?.successful}</h2>
        <div className="text-sm text-[#49454FCC] font-[600]">
          Successful Transactions
        </div>
      </div>

      <div className="mb-4 p-4 py-10 bg-[#F2C94C1A] rounded-lg w-full border border-[#F2C94C4D]">
        <h2 className="text-xl font-[700] text-amber-400">{transactions?.pending}</h2>
        <div className="text-sm text-[#49454FCC] font-[600]">
          Pending Transactions
        </div>
      </div>

      <div className="mb-4 p-4 py-10 bg-[#EB57571A] rounded-lg w-full border border-[#EB57574D]">
        <h2 className="text-xl font-[700] text-[#D12953]">{transactions?.failed}</h2>
        <div className="text-sm text-[#49454FCC] font-[600]">
          Failed Transactions
        </div>
      </div>
    </div>
    <div className="container w-full gap-5 flex lg:flex-row-reverse flex-col-reverse">
      <div className="flex flex-col w-full">
        <div className="mb-4 p-4 flex flex-col items-start bg-white rounded-lg w-full border border-[#00000026]">
          <div>
            <h2 className="text-lg  font-[700] ">GH₵ {transactions?.totalAmount}</h2>
            <div className="text-sm text-[#49454FCC] font-[600]">
              Total Revenue Generated
            </div>
          </div>
          <button className="underline mt-5 text-blue-600  text-sm font-[400]">
            View links
          </button>
        </div>
        <div className="mb-4 p-4 flex flex-col items-start bg-white rounded-lg w-full border border-[#00000026]">
          <div>
            <h2 className="text-lg  font-[700] ">Amount</h2>
            <div className="text-sm text-[#49454FCC] font-[600]">
              Total Revenue Generated
            </div>
          </div>
          <button className="underline mt-5 text-blue-600  text-sm font-[400]">
            View links
          </button>
        </div>
        <div className="mb-4 p-4 flex flex-col items-start bg-white rounded-lg w-full border border-[#00000026]">
          <div>
            <h2 className="text-lg  font-[700] ">Amount</h2>
            <div className="text-sm text-[#49454FCC] font-[600]">
              Total Revenue Generated
            </div>
          </div>
          <button className="underline mt-5 text-blue-600  text-sm font-[400]">
            View links
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-white rounded-lg w-full border border-[#00000026]">
        <h2 className="text-lg font-semibold">Payment Summary</h2>
        <div className="text-sm text-[#49454FCC] font-[600] mb-5">Date</div>

        <div className="flex flex-row justify-between items-center">
          <div className="gap-2">
            <img src="" />
            <div>Name</div>
          </div>
          <div>Amount</div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SuperAdminHome