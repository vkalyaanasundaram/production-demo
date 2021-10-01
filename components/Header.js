import useSWR from "swr";
import { request } from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const Header = () => {
  const { data, error } = useSWR(
    `{
        menu(id: "3", idType: DATABASE_ID) {
            id
            databaseId
            name
            menuItems {
              edges {
                node {
                  id
                  label
                  parentId
                  url
                }
              }
            }
        }
      }`,
    fetcher
  );

  if (error) return <div> error.... </div>;
  if (!data) return <div> Loading.... </div>;

  const primaryMenus = data?.menu?.menuItems?.edges;

  return (
    <>
      <header className="text-gray-600 body-font bg-indigo-900">
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
      </header>
    </>
  );
};

export default Header;
