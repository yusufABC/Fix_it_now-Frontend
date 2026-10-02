'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation' // 👈 Added usePathname
import { ChevronDown, CircleUserRound, LayoutDashboard, LogOut, Settings, UserRound } from 'lucide-react'

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
import { Button } from '../ui/button'

type IUser = {
  success: boolean
  statusCode: number
  message: string
  data?: {
    profile?: {
      id: string
      name: string
      email: string
      role: string
      status: string
      createdAt: string
      updatedAt: string
      technicianProfile?: {
        id: string
        userId: string
        skills: string[]
        yearOfExperience: number
        location: string
        averageRating: number
        totalReviews: number
        createdAt: string
        updatedAt: string
      } | null
    }
  }
}

type NavbarProps = {
  user?: IUser | null
}

export function Navbar({ user }: NavbarProps) {
  const [isLogout, setIsLogout] = useState(false)
  const router = useRouter()
  const pathname = usePathname() // 👈 Gets current active URL path

  const handleUserMenuAction = async (action: string) => {
    if (action === 'logout') {
      await logout()
      setIsLogout(true)
    }
  }

  useEffect(() => {
    if (isLogout) {
      toast.success('Logged out successfully')
      router.push('/login')
      router.refresh()
    }
  }, [isLogout, router])

  const userProfile = user?.data?.profile
  const userRole = userProfile?.role

  // Helper to get the correct dashboard URL based on user role
  const getDashboardHref = () => {
    if (userRole === 'ADMIN') return '/admin-dashboard'
    if (userRole === 'TECHNICIAN') return '/technician-dashboard'
    return '/dashboard' // Default for CUSTOMER
  }

  const dashboardHref = getDashboardHref()

  // Helper to determine active link styling
  const getNavLinkClass = (href: string) => {
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
    return `rounded-md px-3.5 py-1.5 text-sm font-medium transition-all ${
      isActive
        ? 'bg-primary text-primary-foreground shadow-sm' // 👈 Active highlight
        : 'text-muted-foreground hover:bg-muted hover:text-foreground' // Inactive
    }`
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CircleUserRound aria-hidden="true" />
          </span>
          Fix it NOW
        </Link>

        {/* Navigation Links with Active Highlighting */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-1.5 md:flex">
          {/* Home Link */}
          <Link href="/" className={getNavLinkClass('/')}>
            Home
          </Link>

          {/* Services Link: Visible to Public Guests and Customers */}
          {(!userRole || userRole === 'CUSTOMER') && (
            <Link href="/services" className={getNavLinkClass('/services')}>
              Services
            </Link>
          )}

          {/* Dynamic role-based dashboard link (Only appears if user is logged in) */}
          {user?.success && (
            <Link href={dashboardHref} className={getNavLinkClass(dashboardHref)}>
              Dashboard
            </Link>
          )}
        </nav>

        {/* User Profile Dropdown or Login Button */}
        {user?.success && userProfile ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground outline-none">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary text-xs text-primary-foreground font-bold">
                  {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : <CircleUserRound aria-hidden="true" />}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline font-medium">{userProfile.name}</span>
              <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Open user menu</span>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold leading-none">{userProfile.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userProfile.email}</p>
                    <span className="mt-1 w-fit rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 uppercase border border-blue-200">
                      {userProfile.role}
                    </span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={dashboardHref} className="flex items-center gap-2 cursor-pointer">
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <UserRound className="size-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 cursor-pointer"
                onClick={async () => {
                  await handleUserMenuAction('logout')
                }}
              >
                <LogOut className="size-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button className="cursor-pointer font-semibold rounded-xl">Login</Button>
          </Link>
        )}
      </div>
    </header>
  )
}