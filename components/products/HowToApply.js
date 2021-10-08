import React, { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { contentNav } from "../../styles/Home.module.css";

import { useRouter } from "next/router";

const HowToApply = ({ data }) => {
  //   console.log(data)
  return (
    <>
      <div className={contentNav}>
        <div className="container py-10 px-5">
          <div className="container">{ReactHtmlParser(data)}</div>
        </div>
      </div>
    </>
  );
};

export default HowToApply;
