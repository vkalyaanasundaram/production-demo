import useSWR from "swr";
import { request } from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Header = () => {
  const { asPath, pathname } = useRouter();
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const { data, error } = useSWR("/api/page/header", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // console.log(data);

  const primaryMenus = data?.menuItems?.edges;
  // console.log(primaryMenus);

  return (
    <>
      {/* <header className="text-gray-600 body-font bg-indigo-900">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            href="/"
            passHref
          >
            <span className="ml-3 text-xl">KAPITUS</span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            {primaryMenus.map(({ node }, index) => (
              <span className="text-gray-50 px-4" key={index}>
                <Link href={node.url}>{node.label}</Link>
              </span>
            ))}
          </nav>
        </div>
      </header> */}
      <nav className=" bg-indigo-900 flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">KAPIUTS</span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuVisibility(!isMenuVisible)}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isMenuVisible ? "max-h-full" : "h-0"
          } overflow-hidden w-full lg:h-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow">
            {primaryMenus.map(({ node }, index) => (
              <span
                className="text-white block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                key={index}
              >
                <Link href={node.url} passHref>
                  {node.label}
                </Link>
              </span>
            ))}
          </div>
          <div>
            <Link
              href="/fast-application/"
              passHref
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
