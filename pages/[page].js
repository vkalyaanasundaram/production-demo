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

const Content = dynamic(() => import("../components/Content"), {
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
  const ACFcontact = data?.ACFcontact;
  const AccordionData = data?.accordionData;
  // alert(asPath  );
  switch (asPath) {
    case "/problems-we-solve":
      return (
        <>
          <Header />
          {inView && <Content data={ThreeColumnStaticPage?.cards} />}
        </>
      );
    case "/partner":
      return (
        <>
          <Header />
          {inView && <Content data={ThreeColumnStaticPage?.cards} />}
        </>
      );
    case "/contact-us":
      return (
        <>
          <Header />
          <ContactUs data={ACFcontact} />
        </>
      );
    default:
      return (
        <>
          <Header />
          {inView && <Content data={ThreeColumnStaticPage?.cards} />}
          {inView && <FinanceSolutions />}
        </>
      );
  }
}
