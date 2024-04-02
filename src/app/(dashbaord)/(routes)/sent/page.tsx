import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'
import Filesdashboard from '@/components/dashboards/Filedashboard'
import Sentdashboard from '@/components/dashboards/Sentdashboard'

export default function Files(){
    return(
        <div>
            {/* test
            <UserButton afterSignOutUrl="/" /> */}
           <Sentdashboard />
         
        </div>
        
    )
}