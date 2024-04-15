"use client"
import React from 'react'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { useUser } from "@clerk/clerk-react";
import { UserButton } from '@clerk/nextjs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MobileNav from './Mobilenav'

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>CelestialDOC</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className='flex items-center space-x-4 '>
            {user ? (
              <>
                <Link
                  href='/gist'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Gist
                </Link>

                <div className='sm:block hidden'>
                  <Link
                    href='/dashboard'
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'sm',

                    })} >
                    Dashboard
                  </Link>
                </div>


                <UserButton />
              </>


            ) : (
              <>
                <Link
                  href='/gist'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Gist
                </Link>
                <Link
                  href='/sign-up'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Get Started
                </Link>
              </>

            )}

          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
