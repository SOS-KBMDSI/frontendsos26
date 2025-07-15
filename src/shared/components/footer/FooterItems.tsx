import Link from "next/link";
import { navListData } from "@/shared/data/navListData";

export const FooterLinks = () => {
  return (
    <div className="flex flex-col items-center gap-4 md:gap-6 md:items-start">
      <h3 className="hidden md:block font-semibold text-xl text-default-dark">
        Navigasi
      </h3>
      <ul className="flex flex-row flex-wrap justify-center gap-y-2 md:flex-col md:space-y-5 md:items-start">
        {navListData.map((item, index) => (
          <li key={item.title} className="flex items-center">
            <Link
              href={item.href}
              className="text-sm md:text-xl font-normal text-primary-700 hover:text-primary-500 transition-colors"
            >
              {item.title}
            </Link>

            {index < navListData.length - 1 && (
              <span
                aria-hidden="true"
                className="mx-1 md:hidden text-primary-700"
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
