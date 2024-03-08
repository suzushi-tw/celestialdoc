import React from 'react'
import { UserButton } from '@clerk/nextjs'
export default function Files(){
    return(
        <div>
            test
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}