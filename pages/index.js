import Head from "next/head";
import Image from "next/image";
import loadable from "@loadable/component";
import Footer from "../components/Footer";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import { bgWrap, bgText } from "../styles/Home.module.css";

const Header = loadable(() => import("../components/Header"));

export default function Home() {
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
      <Header />
      <section className="relative">
        <div className={bgWrap}>
          <Image
            alt="Mountains"
            src="/HeroImages_secondarypage_salespartners.jpg"
            layout="fill"
            objectFit="cover"
            quality={100}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
          />
        </div>
        <div className={bgText}>
          <div className="xs:grid col-auto lg:grid grid-cols-2 gap-1 p-3">
            <div className="text-blue-900 mb-10">
              <div className="sm:w-full text-5xl xs:w-full text-5xl md:text-5xl">
                Business Loan Financing to: <br />
                Grow your business
              </div>
              <div className="sm:text-lg xs:text-sm mt-5 md:text-2xl text-blue-900">
                <button>GET STARTED</button>
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

            {/* <div className="xs: hidden sm:hidden md:block ">{ReactHtmlParser(frmData)}</div> */}
          </div>
        </div>
      </section>
      <section>
        <div className="container px-5 py-24 mx-auto">
          <h3 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-6 mb-6 text-center">
            Explore by Popular Topics
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <button className="text-black bg-gray-100 border-0 py-8 px-8 uppercase focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg">
              LEADERSHIP
            </button>
            <button className="text-black bg-gray-100 border-0 py-8 px-8 uppercase focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg">
              GETTING CUSTOMERS
            </button>
            <button className="text-black bg-gray-100 border-0 py-8 px-8 uppercase focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg">
              Upcoming Events
            </button>
            <button className="text-black bg-gray-100 border-0 py-8 px-8 uppercase focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg">
              Managing Money
            </button>
            <button className="text-black bg-gray-100 border-0 py-8 px-8 uppercase focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg">
              Office Hours
            </button>
            <button className="text-black bg-gray-100 border-0 py-8 px-8 uppercase focus:outline-none hover:bg-indigo-600 hover:text-white rounded text-lg">
              Cash Flow
            </button>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h3 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">
            Whats New This Week
          </h3>
        </div>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Pitchfork Kickstarter Taxidermy
              </h1>
              <div className="h-1 w-20 bg-indigo-500 rounded"></div>
            </div>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify, subway tile poke farm-to-table. Franzen you probably
              haven heard of them man bun deep jianbing selfies heirloom prism
              food truck ugh squid celiac humblebrag.
            </p>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font text-center">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-full md:w-full md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">
              Slow-carb next level shoindcgoitch ethical authentic, poko
              scenester
            </h1>
            <p className="leading-relaxed mt-4">
              Poke slow-carb mixtape knausgaard, typewriter street art gentrify
              hammock starladder roathse. Craies vegan tousled etsy austin.
            </p>
          </div>
        </div>
      </section>
      {/* Footer  */}
      <Footer />
    </>
  );
}
