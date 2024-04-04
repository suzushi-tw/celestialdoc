import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Dashboard from '@/components/Dashboard'
import Filesdashboard from '@/components/dashboards/Filedashboard'
import Favoritedashboard from '@/components/dashboards/Favoritedashboard'

export default function Files() {
    return (
        <div>
            {/* test
            <UserButton afterSignOutUrl="/" /> */}
            <Favoritedashboard />

        </div>

    )
}