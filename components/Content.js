import React, { useEffect } from "react";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import Image from "next/image";

const Content = ({ data }) => {
  // console.log(data);

  return (
    <div className="container mx-auto">
      <section
        className="container grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3"
        style={{ marginTop: 100, marginBottom: 30 }}
      >
        {data?.map((value, key) => (
          <div
            className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black"
            key={key}
          >
            <div className="grid place-items-center w-full text-right">
              <Image
                src={value?.svgIcon?.sourceUrl}
                width="100"
                height="100"
                alt=""
              />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-center mx-8">
              {ReactHtmlParser(value?.cardTitle)}
            </h2>
            <div className="place-items-center">
              <p className="mb-4 p-5">{value?.cardContent}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Content;
