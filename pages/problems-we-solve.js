import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Content from "../components/Content";
import { useRouter } from "next/router";
import useSWR from "swr";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";

import ContactUs from "../components/pages/ContactUs";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
export default function Contant() {
  const { asPath, pathname } = useRouter();
  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const BannerData = data?.ThreeColumnStaticPage?.banner;

  return (
    <>
      <head>
        <title>Problems We Solve</title>
      </head>
      <Header />
      <Banner data={BannerData} />
      <div>
        <div className="container py-10 px-5">
          <div ref={observe}>
            {inView && <Content data={data?.ThreeColumnStaticPage?.cards} />}
          </div>
        </div>
      </div>
      <div ref={observe}>{inView && <Footer />}</div>
    </>
  );
}
