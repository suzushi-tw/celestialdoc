import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'
import Filesdashboard from '@/components/dashboards/Filedashboard'
import Sentdashboard from '@/components/dashboards/Sentdashboard'
import Gistdashboard from '@/components/dashboards/Gistdashboard'

export default function Gist(){
    return(
        <div>
            {/* test
            <UserButton afterSignOutUrl="/" /> */}
           <Gistdashboard/>
         
        </div>
        
    )
}