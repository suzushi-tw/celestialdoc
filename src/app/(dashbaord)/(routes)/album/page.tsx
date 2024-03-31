import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'
import Filesdashboard from '@/components/dashboards/Filedashboard'
import Albumdashboard from '@/components/dashboards/Albumdashboard'

export default function Album(){
    return(
        <div>
            {/* test
            <UserButton afterSignOutUrl="/" /> */}
           
            <Albumdashboard />
        </div>
        
    )
}