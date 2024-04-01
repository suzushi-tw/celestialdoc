import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'
import Filesdashboard from '@/components/dashboards/Filedashboard'

export default function Files(){
    return(
        <div>
            {/* test
            <UserButton afterSignOutUrl="/" /> */}
           
            <Filesdashboard />
        </div>
        
    )
}