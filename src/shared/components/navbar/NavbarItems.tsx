// file: components/NavbarItem.tsx

import Link from "next/link";

interface NavbarItemProps {
  href: string;
  title: string;
  isActive: boolean;
}

const NavbarItem = ({ href, title, isActive }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className={`xl:text-2xl text-xl md:text-lg font-normal  ${
        isActive ? "text-white " : "text-[#F3EFE8CC]"
      } hover:text-white`}
    >
      {title}
    </Link>
  );
};

export default NavbarItem;
