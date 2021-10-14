import Head from "next/head";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { bgWrap, bgText } from "../styles/Home.module.css";

export default function Banner({ data }) {
  // const classNamees = useStyles();
  // console.log(data);
  // data?.ThreeColumnStaticPage?.banner
  const BannerImg = data?.bannerImage?.sourceUrl;
  const MobileBannerImage = data?.mobileBannerImage?.sourceUrl;

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

  return (
    <>
      <section className="relative">
        <div>
          {MobileBannerImage?.length > 0 && (
            <MobileView className={bgWrap}>
              <Image
                alt=""
                src={MobileBannerImage}
                layout="fill"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </MobileView>
          )}

          {BannerImg?.length > 0 && (
            <BrowserView>
              <Image
                alt=""
                src={BannerImg}
                layout="fill"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
              />
            </BrowserView>
          )}
        </div>
        <div className={bgText}>
          <div className="xs:grid col-auto lg:grid grid-cols-2 gap-1 p-3">
            <div className="text-blue-900 mb-10">
              <div className="sm:w-full text-5xl xs:w-full text-5xl md:text-5xl">
                {data?.bannerTitle}
              </div>
              <div className="xs:text-xl m-10 lg:text-2xl text-green-900">
                {ReactHtmlParser(data?.bannerDescription)}
              </div>
              <div className="sm:text-lg xs:text-sm mt-5 md:text-2xl text-blue-900">
                {ReactHtmlParser(data?.bannerButton)}
              </div>

              {/* <div className="xs:text-xl mt-5 text-xs text-blue-900 text-left copyrights">
                <p className="mt-5 text-xs">
                  Copyright 2021 • Kapitus • All Rights Reserved Loans made in
                  California are issued by Strategic Funding Source, Inc. dba
                  Kapitus, pursuant to California Finance Lenders License No.
                  603-G807.
                </p>
              </div> */}
            </div>

            <div className="xs: hidden sm:hidden md:block ">
              {/* {ReactHtmlParser(frmData)} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
