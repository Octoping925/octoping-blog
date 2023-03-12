import { useEffect, useRef } from "react";
import Link from "next/link";
import BLOG from "@/blog.config";
import { useLocale } from "@/lib/locale";

const NavBar = () => {
  const locale = useLocale();
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || "/", show: false },
    { id: 1, name: locale.NAV.ABOUT, to: "/about", show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: "/feed", show: false },
    { id: 3, name: locale.NAV.SEARCH, to: "/search", show: false },
  ];

  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>{link.name}</Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

const Header = ({
  navBarTitle,
  fullWidth,
}: {
  navBarTitle: string;
  fullWidth: boolean;
}) => {
  const useSticky = !BLOG.autoCollapsedNavBar;
  const navRef = useRef(null);
  const sentinalRef = useRef();

  useEffect(() => {
    const obvserver = new window.IntersectionObserver(([entry]) => {
      if (navRef && navRef.current && useSticky) {
        if (!entry.isIntersecting && entry !== undefined) {
          navRef.current?.classList.add("sticky-nav-full");
        } else {
          navRef.current?.classList.remove("sticky-nav-full");
        }
      } else {
        navRef.current?.classList.add("remove-sticky");
      }
    });

    obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef]);
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef} />
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? "max-w-4xl px-4" : "px-4 md:px-24"
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <div className="font-bold text-4xl flex-initial dark:text-white mr-6 header-blog-title">
              Octoping
            </div>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title}
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
