import { useAppDispatch, useAppSelector } from '@/app/redux'
import { setIsSidebarCollapsed } from '@/state'
import { Menu } from 'lucide-react'
import React from 'react'


const Navbar = () => {
    const dispatch = useAppDispatch()
    const isSideBarCollapsed = useAppSelector((state) => state.global.isSideBarCollapsed)

  return (
    <div className='flex items-center justify-between bg-gray-50 px-4 py-3'>
        <div className='flex items-center gap-8'>
            {!isSideBarCollapsed ? null : (
                <button onClick={() => dispatch(setIsSidebarCollapsed(!isSideBarCollapsed))}>
                    <Menu className='h-8 w-8' />
                </button>
            )}
        </div>
    </div>
  )
}

export default Navbar