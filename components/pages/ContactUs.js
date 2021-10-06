import React from "react";
import Image from "next/image";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useInView from "react-cool-inview";
var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

const Header = dynamic(() => import("../Header"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const ContactUs = (data) => {
  const contactData = data;

  mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "kapitus-map",
      style: "mapbox://styles/kapitus/cjtyljmho3vok1fntmnu0c8hq",
      /*center: [-73.98387980000001, 40.75704],*/
      center: [-1.98387980000001, 30.75704],
      zoom: 2,
    });
  });

  console.log(contactData);
  return (
    <div className="bg-gray-100">
      <Header />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Image
            src={contactData?.data.image?.sourceUrl}
            alt=""
            width={700}
            height={500}
            className={"image"}
            quality={100}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />
        </div>
        {/* <div>{ReactHtmlParser(contactData.data.form)}</div> */}
      </div>
      <div id="kapitus-map" className="w-full" style={{ height: 500 }}></div>
    </div>
  );
};

export default ContactUs;
