import React from 'react'



type props = {title:string} & React.ComponentProps<"button">;
function Button({title, ...rest}:props) {
  return (
    <button {...rest} className='bg-primary w-full flex justify-center items-center py-[0.5rem] px-[1.5rem] rounded-full font-Bricolage text-[1.125rem] text-[#0E1117] font-bold'>
        {title}
    </button>
  )
}

export default Button;
