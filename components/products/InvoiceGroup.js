import React, { useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";
import Image from "next/image";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const GroupColumn = ({ columnone, columnTwo }) => {
  //   alert(columnone);
  return (
    <>
      <div className="container">
        <div className="float-left clear-both w-full">
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {columnone?.map((value, key) => (
              <div
                className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black"
                key={key}
              >
                <div className="grid place-items-center w-full text-right">
                  <Image
                    src={value?.groupImageOne?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-center mx-8">
                  {ReactHtmlParser(value?.groupTitleOne)}
                </h2>
                <div className="place-items-center">
                  <p className="mb-4 p-5">{value?.groupContentOne}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>

      <div className="container">
        <div className="float-left clear-both w-full">
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            {columnTwo?.map((value, key) => (
              <div
                className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black"
                key={key}
              >
                <div className="grid place-items-center w-full text-right">
                  <Image
                    src={value?.groupImageTwo?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-center mx-8">
                  {ReactHtmlParser(value?.groupTitleTwo)}
                </h2>
                <div className="place-items-center">
                  <p className="mb-4 p-5">{value?.groupContentTwo}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default GroupColumn;
