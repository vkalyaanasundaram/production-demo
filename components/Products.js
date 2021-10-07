import Link from "next/link";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

export default function ProductsContainer({ data }) {
  console.log(data);
  return (
    <>
      <div className="float-left clear-both">
        <div className="container mx-auto">
          <div>{ReactHtmlParser(data?.ourGoal)}</div>
          <section
            className="container grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3"
            style={{ marginTop: 100, marginBottom: 30 }}
          >
            {data?.productsCards?.map((value, key) => (
              <div
                className="relative shadow-md rounded-md overflow-hidden dark:bg-red-100"
                key={key}
              >
                <div className="grid place-items-center w-full text-right mt-5">
                  <Image
                    src={value?.svgIcon?.sourceUrl}
                    width="100"
                    height="100"
                    alt=""
                  />
                </div>
                <h5 className="text-4xl font-normal text-blue-900 mt-4 mb-4 text-center mx-8 uppercase">
                  {value?.cardTitle}
                </h5>
                <div className="place-items-center">
                  <div className="mb-4 p-5 text-center text-lg text-blue-900 ">
                    {ReactHtmlParser(value?.cardContent)}
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0">
                  <button
                    className="shadow-md p-5 bg-blue-900"
                    onClick={(e) => {
                      cardPage(value?.cardSlug);
                    }}
                  >
                    {ReactHtmlParser(value?.cardButton)}
                  </button>
                </div>
              </div>
            ))}
          </section>
          <div>{ReactHtmlParser(data?.getStartedToday)}</div>
        </div>
      </div>
    </>
  );
}
