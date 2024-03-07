import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight, Github } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import { Feedbackbutton } from './Feedback'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import AIChatButton from "@/components/AIChatButton";
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
  const { getUser } = getKindeServerSession()
  const user = getUser()

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>CelestialPDF</span>
          </Link>

          <MobileNav isAuth={!!user} />

          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild
                    className='overflow-visible focus-visible:ring-transparent'>
                    <Button className='bg-white'>
                      <p className='text-black'>Language/語言</p>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className='bg-white' align='end'>

                    <DropdownMenuItem asChild>
                      <Link href='/chinese-homepage'>简体中文</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href='/traditionalchinese-homepage'>繁體中文</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href='/german-homepage'>Deutsch</Link>
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>



                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Pricing
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Sign in
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Get started{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </RegisterLink>
              </>
            ) : (
              <>
                <Feedbackbutton />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className='focus-visible:ring-transparent'>
                    <Button variant="outline" className='focus-visible:ring-transparent'>Tools/工具</Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className='bg-white flex flex-col' align='end'>

                    <DropdownMenuItem asChild className='focus-visible:ring-transparent'>
                      <Link
                        href='/mindmap'
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'sm', 
                        })}>
                        Mindmap
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className='focus-visible:ring-transparent'>
                      <Link
                        href='/Flowchartdashboard'
                        className={buttonVariants({
                          variant: 'ghost',
                          size: 'sm',
                        })}>
                        Flowchart/Diagram
                      </Link>
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href='/multipdf'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  MultiPDF
                </Link>

                {/* <Link
                  href='/selectpdf'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  SelectPDF
                </Link>  */}


                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Dashboard
                </Link>

                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
