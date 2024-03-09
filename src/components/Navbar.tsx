import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'


// import MobileNav from './MobileNav'
// import { Feedbackbutton } from './Feedback'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"

const Navbar = () => {


  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>CelestialDOC</span>
          </Link>

          {/* <MobileNav isAuth={!!user} /> */}

          <div className='hidden items-center space-x-4 sm:flex'>
            <Link
              href='/files'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}>
              Get Started
            </Link>

          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
