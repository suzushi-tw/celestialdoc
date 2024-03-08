import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import React from 'react'



function TopHeader() {
  return (
    <div className='flex p-5 border-b items-center first-letter:justify '>
        <AlignJustify className='md:hidden'/>

        <UserButton />
      
    </div>
  )
}

export default TopHeader
