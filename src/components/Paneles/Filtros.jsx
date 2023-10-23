import React from 'react'
import { TbFilterStar } from 'react-icons/tb'

export const Filtros = ({ children }) => {
  return (
    <div className="text-md p-1 ps-4 pe-4 dark:text-white flex flex-wrap items-center text-slate-700 grid1 bg-gray-100 border">
        <TbFilterStar size={20} className='hidden md:block ms-3 me-4'/> {children}
    </div>
  )
}
