import React, { useEffect, useState } from "react";
import useInView from "react-cool-inview";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import dynamic from "next/dynamic";
import { contentNav } from "../../styles/Home.module.css";

import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";

// import Requirements from './Requirements'
// import HowToApply from './HowToApply'
// import Who from './Who'

const Requirements = dynamic(() => import("./Requirements"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const HowToApply = dynamic(() => import("./HowToApply"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const Who = dynamic(() => import("./Who"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const Content = ({ content, desc }) => {
  const [showRequirements, setRequirements] = useState(false);
  const [showHowToApply, setHowToApply] = useState(false);
  const [showWhosFor, setWhosFor] = useState(false);

  const { router, asPath } = useRouter();

  return (
    <>
      <div className={contentNav}>
        <div className="container py-10 px-5">
          <div className="text-red-700">
            <span className="pr-10" onClick={() => setRequirements(true)}>
              Requirements
            </span>
            <span className="pr-10" onClick={() => setHowToApply(true)}>
              How To Apply
            </span>
            <span className="pr-10" onClick={() => setWhosFor(true)}>
              Who is this For?
            </span>
          </div>
        </div>
        <div className="float-left my-5 px-5">
          <div className="container">{ReactHtmlParser(desc)}</div>
        </div>
        <div className="float-left my-10 px-5">
          <div className="container">{ReactHtmlParser(content)}</div>
        </div>
      </div>
    </>
  );
};

export default Content;
