import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'

export default function Files(){

    
    return(
        <div className='min-h-full max-h-[calc(100vh-3.5rem)]'>
            {/* test
            <UserButton afterSignOutUrl="/" /> */}
            <Dashboard />
        </div>
        
    )
}