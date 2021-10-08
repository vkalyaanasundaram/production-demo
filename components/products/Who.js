import React, { useEffect, useState } from "react";
import { useInView } from "react-cool-inview";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

import { useRouter } from "next/router";

const Who = ({ data }) => {
  //   console.log(data)
  return <div className="container">{ReactHtmlParser(data)}</div>;
};

export default Who;
