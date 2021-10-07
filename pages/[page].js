import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { request } from "graphql-request";
import { useState } from "react";
import useInView from "react-cool-inview";

// import Content from "../components/Content";
import FinanceSolutions from "../components/FinanceSolution";
import ContactUs from "../components/pages/ContactUs";
import MediaCenter from "../components/pages/MediaCenter";
import Banner from "../components/Banner";
import ProductBanner from "../components/products/Banner";
import Products from "../components/Products";

const Content = dynamic(() => import("../components/Content"), {
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

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SinglePage() {
  // const { data, error } = useSWR("./api/page/problems-we-solve", fetcher);
  const { asPath, pathname } = useRouter();

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const ThreeColumnStaticPage = data?.ThreeColumnStaticPage;
  const ProductsData = data?.productsAcf;
  const BannerData = data?.ThreeColumnStaticPage?.banner;
  const ACFcontact = data?.ACFcontact;
  const AccordionData = data?.accordionData;
  // console.log(ProductsData);
  switch (asPath) {
    case "/problems-we-solve":
      return (
        <>
          <Header />
          <Banner data={BannerData} />
          <div ref={observe}>
            <Content data={ThreeColumnStaticPage?.cards} />
          </div>
          <div ref={observe}>{inView && <Footer />}</div>
        </>
      );
    case "/products-we-offer":
      return (
        <>
          <Header />
          <div ref={observe}>
            <ProductBanner data={ProductsData} />
            <div ref={observe}>
              {inView && <Products data={ProductsData} />}
            </div>
          </div>
          <div ref={observe}>{inView && <Footer />}</div>
        </>
      );
    case "/partner":
      return (
        <>
          <Header />
          <Banner data={BannerData} />
          <div ref={observe}>
            {inView && <Content data={ThreeColumnStaticPage?.cards} />}
          </div>
          <div ref={observe}>{inView && <Footer />}</div>
        </>
      );
    case "/contact-us":
      return (
        <>
          <Header />
          <ContactUs data={ACFcontact} />
          <div ref={observe}>{inView && <Footer />}</div>
        </>
      );
    default:
      return (
        <>
          <Header />
          <Banner data={BannerData} />
          <div ref={observe}>
            {inView && <Content data={ThreeColumnStaticPage?.cards} />}
          </div>
          <div ref={observe}>{inView && <FinanceSolutions />}</div>
          <div ref={observe}>{inView && <Footer />}</div>
        </>
      );
  }
}
