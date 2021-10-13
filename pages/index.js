import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { bgWrap, bgText } from "../styles/Home.module.css";
import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";
import useInView from "react-cool-inview";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { contentNav } from "../styles/Home.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Header = dynamic(() => import("../components/Header"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Content = dynamic(() => import("../components/Content"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const FinanceSolution = dynamic(() => import("../components/FinanceSolution"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function Home() {
  const { data, error } = useSWR("/api/page/home", fetcher);

  let { asPath, pathname } = useRouter();
  const router = useRouter();

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

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const bannerContent = data?.page?.ThreeColumnStaticPage?.banner;

  return (
    <>
      <Header />
      {/* <section>
        <div className={bgWrap}>
          {bannerContent?.mobileBannerImage?.sourceUrl.length > 0 && (
            <MobileView>
              <Image
                alt="Mountains"
                src="/Tablet-image2.png"
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

          {bannerContent?.bannerImage?.sourceUrl?.length > 0 && (
            <BrowserView>
              <Image
                alt="Mountains"
                src="/Desktop-Image3_1366x384-1.jpg"
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
                {bannerContent?.bannerTitle}
              </div>
              <div className="sm:text-lg xs:text-sm mt-5 md:text-2xl text-blue-900">
                {ReactHtmlParser(bannerContent?.bannerButton)}
              </div>

              <div className="xs:text-xl mt-5 text-xs text-blue-900 text-left copyrights">
                <p className="mt-5 text-xs">
                  Copyright 2021 • Kapitus • All Rights Reserved Loans made in
                  California are issued by Strategic Funding Source, Inc. dba
                  Kapitus, pursuant to California Finance Lenders License No.
                  603-G807.
                </p>
              </div>
            </div>

            <div className="xs: hidden sm:hidden md:block ">
            </div>
          </div>
        </div>
      </section> */}
      <section ref={observe}>
        {inView && <Content data={data?.page?.ThreeColumnStaticPage?.cards} />}
      </section>
    </>
  );
}
