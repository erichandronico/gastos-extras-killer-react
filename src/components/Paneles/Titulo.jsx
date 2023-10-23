import React from 'react'

export const Titulo = ({ texto, Icono, children=(<></>) }) => {
  return (
    <h2 className="text-xl p-1 font-bold dark:text-white flex items-center border rounded-lg bg-green-50 text-slate-600">
    <div className='mx-2 text-slate-600 flex'>
       {Icono}
    </div>
    {texto} {children}
</h2>
  )
}
