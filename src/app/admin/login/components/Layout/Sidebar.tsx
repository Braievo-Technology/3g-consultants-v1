'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  HomeIcon,
  NewspaperIcon,
  FolderIcon,
  CalendarIcon,
  BriefcaseIcon,
  UsersIcon,
  LogOutIcon
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024
      setIsDesktop(desktop)
      if (desktop) {
        setIsOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [setIsOpen])

  const sidebarVariants = {
    open: { width: '240px', transition: { duration: 0.3 } },
    closed: { width: '60px', transition: { duration: 0.3 } }
  }

  const navItems = [
    { path: '/admin/login/pages/dashboard', name: 'Dashboard', icon: <HomeIcon size={20} /> },
    { path: '/admin/login/pages/news-feed', name: 'News Feed', icon: <NewspaperIcon size={20} /> },
    { path: '/admin/login/pages/projects', name: 'Projects', icon: <FolderIcon size={20} /> },
    { path: '/admin/login/pages/job-opportunities', name: 'Job Opportunities', icon: <BriefcaseIcon size={20} /> },
    { path: '/admin/login/pages/job-applications', name: 'Job Applications', icon: <UsersIcon size={20} /> },
    { path: '/admin/login/pages/company-events', name: 'Company Events', icon: <CalendarIcon size={20} /> }
  ]

  const handleLogout = () => {
    document.cookie = 'admin-auth=; path=/; max-age=0'
    router.push('/admin/admin-login')
  }

  return (
      <motion.div
          className="bg-[#f1c233] text-white h-full fixed lg:relative z-10"
          animate={isOpen || isDesktop ? 'open' : 'closed'}
          variants={sidebarVariants}
          initial={false}
      >
        <div className="p-4 h-16 flex items-center">
          {(isOpen || isDesktop) ? (
              <h1 className="text-xl font-bold text-white">3G Consultants</h1>
          ) : (
              <button onClick={() => setIsOpen(true)} className="p-1 rounded-md hover:bg-white hover:text-[#f1c233] lg:hidden transition-colors">
                <HomeIcon size={24} />
              </button>
          )}
        </div>

        <nav className="mt-4">
          <ul>
            {navItems.map(item => (
                <li key={item.path} className="mb-2">
                  <Link
                      href={item.path}
                      className={`flex items-center px-4 py-3 hover:bg-white hover:text-[#f1c233] transition-colors ${
                          pathname === item.path ? 'bg-white text-[#f1c233]' : ''
                      }`}
                      onClick={() => !isDesktop && setIsOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {(isOpen || isDesktop) && <span>{item.name}</span>}
                  </Link>
                </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <button
              className="flex items-center px-4 py-3 w-full hover:bg-white hover:text-[#f1c233] transition-colors"
              onClick={handleLogout}
          >
            <LogOutIcon size={20} className="mr-3" />
            {(isOpen || isDesktop) && <span>Logout</span>}
          </button>
        </div>
      </motion.div>
  )
}
