import { FaHome } from 'react-icons/fa';
import { MdArticle, MdDashboard, MdSupervisedUserCircle } from 'react-icons/md';
import Link from 'next/link';

export default function Nav() {
  const menuNav = [
    {
      name: 'Home',
      icon: FaHome,
      path: '/',
    },
    {
      name: 'Blog',
      icon: MdArticle,
      path: '/blog',
    },
    {
      name: 'Dashboard',
      icon: MdDashboard,
      path: '/dashboard',
    },
  ];
  return (
    <nav className="flex justify-between items-center p-5 h-[50px] shaow-md">
      <ul className="flex items-center gap-5">
        {menuNav.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className="flex items-center gap-2 text-gray-700 hover:text-orange-700"
            >
              <item.icon />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/login"
        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 flex items-center justify-center rounded-full"
      >
        <MdSupervisedUserCircle className="text-xl text-gray-700" />
      </Link>
    </nav>
  );
}
