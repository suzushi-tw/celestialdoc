import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'

export default function Files(){
    return(
        <div>
            {/* test
            <UserButton afterSignOutUrl="/" /> */}
            <Dashboard />
        </div>
        
    )
}