import Link from "next/link";
import { navListData } from "@/shared/data/navListData";

export const FooterLinks = () => {
  return (
    <div className="flex flex-col items-center gap-[11px] md:gap-[17px] md:items-start">
      <h3 className="hidden md:block font-semibold text-[14px] text-default-dark">
        Navigasi
      </h3>
      <ul className="flex flex-row  justify-center gap-y-[6px] md:flex-col md:space-y-[14px] md:items-start">
        {navListData.map((item, index) => (
          <li key={item.title} className="flex items-center">
            <Link
              href={item.href}
              className="text-[10px] hover:border-b-2 border-primary-500 transition-all md:text-[14px] font-normal text-primary-700 hover:text-primary-500 hover:font-medium"
            >
              {item.title}
            </Link>

            {index < navListData.length - 1 && (
              <span
                aria-hidden="true"
                className="mx-[3px] md:hidden text-primary-700"
              >
                |
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
