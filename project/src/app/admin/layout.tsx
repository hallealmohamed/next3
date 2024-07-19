import React from 'react'
import AdminSidebar from './AdminSidebar';

interface AdminDashboardLayoutProps
{
    children:React.ReactNode;
}
const AdmiDashboardLayout = ({children}:AdminDashboardLayoutProps) => {
  return (
    <div className='custom flex items-start justify-between overflow-hidden'>
        <div className='h-screen w-15 lg:w-1/5 bg-purple-600 text-white p-1'>
  <AdminSidebar/>
</div>
        <div className='custom w-full lg:w-4/5 overflow-y-scroll'>
        {children}
        </div>
    </div>
  )
}

export default AdmiDashboardLayout;

