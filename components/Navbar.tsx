'use client';

import { useState } from 'react';
import { Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Sidebar from './Sidebar';

type Props = {};

const Navbar = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="fixed z-20">
      <div className={`${isSidebarOpen && 'hidden'} fixed bg-gray-600/50 rounded-md top-3 left-3 cursor-pointer hover:bg-gray-600 focus:bg-gray-600`}>
        <Bars3BottomLeftIcon
          onClick={() => setIsSidebarOpen(true)}
          className="text-white h-8 w-8" />
      </div>

      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ease-in-out duration-500 bg-[#202123] h-screen overflow-y-auto w-[18rem]`}>
        <XMarkIcon
          className="h-8 w-8 text-white rounded-md mx-auto mt-2 bg-gray-600/50 cursor-pointer hover:bg-gray-600"
          onClick={() => setIsSidebarOpen(false)}        
        />
        <Sidebar />
      </div>
    </div>
  );
};

export default Navbar;
