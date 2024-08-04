import Bottombar from '@/components/ui/shared/Bottombar'
import LeftSideBar from '@/components/ui/shared/LeftSideBar'
import Topbar from '@/components/ui/shared/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSideBar />

      <section className="flex flex-1 h-full"></section>
      <Outlet />
      <Bottombar />
    </div>
  )
}

export default RootLayout