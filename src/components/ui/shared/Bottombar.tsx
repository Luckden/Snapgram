import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {sidebarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
            <NavLink
              to={link.route}
              className={`${isActive && 'bg-primary-500'} first-letter:flex-center flex-col gap-1 p-2 transition`}
              key={link.label}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={16}
                height={16}
                className={`group-hover:invert-white ${isActive && 'invert-white'}`}
              ></img>
              <p className="tiny-medium text-light-2">
              {link.label}
              </p>
            </NavLink>
        )
      })}
    </section>

  )
}

export default Bottombar