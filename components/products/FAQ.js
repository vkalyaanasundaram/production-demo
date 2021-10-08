import React, { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";
import { contentNav } from "../../styles/Home.module.css";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const FAQ = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  // console.log(whoShould);

  const handleClick = (index) => {
    console.log(index);
    setCurrentIdx(index);
    toggleCurrent();
  };

  const toggleCurrent = () => {
    if (!showCurrent) {
      setShowCurrent(true);
      return;
    }
  };

  const { router, asPath } = useRouter();
  const { data, error } = useSWR(
    `query individualProduct {
      productsService(id: "${asPath}", idType: URI) {
        faqAcf {
            faqs {
                question
                answer
            }
        }
      }
    }`,
    fetcher
  );

  if (error) return <div> error.... </div>;
  if (!data) return <div> Loading.... </div>;
  const faq = data?.productsService?.faqAcf?.faqs;
  //   console.log(faq)
  return (
    <>
      <div className={contentNav}>
        <div className="container py-5 px-5">
          <h3>FAQs</h3>
          <div className="w-full md:w-3/5 mx-auto p-8">
            <div className="shadow-md">
              {faq?.map((value, key) => (
                // console.log(data);

                <div
                  className="tab w-full overflow-hidden border-t accordion"
                  key={key}
                  id={`tabheading-${key}`}
                  onClick={(event) => handleClick(key)}
                >
                  <input
                    className="absolute opacity-0 accordion"
                    id={`tab-${key}`}
                    type="radio"
                    name="tabs2"
                  />
                  <label
                    className="block p-5 leading-normal cursor-pointer accordion text-blue-600"
                    htmlFor={`tab-single-${key}`}
                    id={`tab-single-${key}`}
                  >
                    {value.question}
                  </label>
                  {showCurrent ? (
                    <div className="tab-content overflow-hidden border-l-2 bg-gray-100 leading-normal">
                      <div className="p-5 text-sm text-gray-600">
                        {ReactHtmlParser(value.answer)}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
