import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/properties', label: 'Properties' },
    { to: '/admin/inquiries', label: 'Inquiries' },
    { to: '/admin/media', label: 'Media' },
    { to: '/admin/settings', label: 'Settings' },
    { to: '/admin/fields', label: 'Custom Fields' },
    { to: '/admin/cleanup', label: 'Cleanup Tools' },
  ];

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 font-bold text-xl border-b">Admin Panel</div>
      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? 'text-realtor-gold font-medium'
                : 'text-gray-700 hover:text-realtor-gold'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;