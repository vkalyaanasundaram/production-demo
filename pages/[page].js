import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { request } from "graphql-request";
import { useState } from "react";

// import Banner from "../components/banner";
// import ProductBanner from '../components/products/banner'
// import Products from '../components/products'
import Content from "../components/Content";
// import Accordion from '../components/Accordion'
import FinanceSolutions from "../components/FinanceSolution";
import ContactUs from "../components/pages/ContactUs";
import MediaCenter from "../components/pages/MediaCenter";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function SinglePage() {
  // const { data, error } = useSWR("./api/page/problems-we-solve", fetcher);
  const { asPath, pathname } = useRouter();

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const ThreeColumnStaticPage = data?.ThreeColumnStaticPage;
  const ACFcontact = data?.ACFcontact;
  const AccordionData = data?.accordionData;
  // alert(asPath  );
  switch (asPath) {
    case "/problems-we-solve":
      return (
        <>
          <Header />
          <Content data={ThreeColumnStaticPage?.cards} />;
        </>
      );
    case "/partner":
      return (
        <>
          <Header />
          <Content data={ThreeColumnStaticPage?.cards} />;
        </>
      );
    case "/contact-us":
      return (
        <>
          <ContactUs data={ACFcontact} />
        </>
      );
    default:
      return (
        <>
          <Content data={ThreeColumnStaticPage?.cards} />
          <FinanceSolutions />
        </>
      );
  }
}
