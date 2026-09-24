'use client'

import Link from 'next/link'
import { ChevronDown, CircleUserRound, LogOut, Settings, User, UserRound } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { logout } from '@/app/services/logout'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Resources', href: '#resources' },
]


type IUser={
    success:boolean,
    statusCode:number,
    message:string,
    data:{
        profile:{
            id:string,
            name:string,
            email:string,
            role:string,
            status:string,  
            createdAt:string,
            updatedAt:string,   
            technicianProfile:{
                id:string,
                userId:string,
                skills:string[],
                yearOfExperience:number,
                location:string,
                averageRating:number,
                totalReviews:number,
                createdAt:string,
                updatedAt:string
            }
        }

    }
}

type NavbarProps={
    user:IUser
}



export function Navbar({user}:NavbarProps) {
  const [isLogout,setIsLogout]=useState(false)
  const router=useRouter()
    const handleUserMenuAction=async (action:string)=>{
    if (action==="logout"){
        await logout()
      setIsLogout(true)

    }   
}

 useEffect(()=>{
    if(isLogout){
      toast("User Logged Out")
      router.push("/login")
    }

    },[isLogout,router])
  return (
    <header className="border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CircleUserRound aria-hidden="true" />
          </span>
          Fix it NOW
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
          {
            user.success? (
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-xs text-primary-foreground"> <CircleUserRound aria-hidden="true" /></AvatarFallback>
            </Avatar>
            {/* <span className="hidden sm:inline">{user.data.profile.name || "hello"}</span> */}
            <ChevronDown aria-hidden="true" />
            <span className="sr-only">Open user menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <span className="block">{user?.data?.profile?.name || "hello"}</span>
                {/* <span className="block text-xs font-normal text-muted-foreground">{user.data.profile.email || "hello"}</span>
                <span className="block text-xs font-normal text-muted-foreground">{user.data.profile.role || "hello"}</span>
                <span className="block text-xs font-normal text-muted-foreground">{user.data.profile.status || "hello"}</span> */}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserRound data-icon="inline-start" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings data-icon="inline-start" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async()=>{
                await handleUserMenuAction("logout")}}>
              <LogOut data-icon="inline-start" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>):
        <Link href={"/login"}>
        <Button className='cursor-pointer'>Login</Button>
        </Link>
          }
      </div>
    </header>
  )
}
