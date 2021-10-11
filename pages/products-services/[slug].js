import Head from "next/head";
import { useRouter } from "next/router";
import useInView from "react-cool-inview";
import dynamic from "next/dynamic";
import useSWR from "swr";
import Header from "../../components/Header";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProductBanner = dynamic(() =>
  import("../../components/products/IndividualBanner")
);
const Content = dynamic(() => import("../../components/products/Content"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const GroupColumn = dynamic(() => import("../../components/products/Group"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Requirements = dynamic(
  () => import("../../components/products/Requirements"),
  {
    loading: function ld() {
      return <p>Loading...</p>;
    },
    ssr: false,
  }
);
const FAQ = dynamic(() => import("../../components/products/FAQ"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Who = dynamic(() => import("../../components/products/Who"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const How = dynamic(() => import("../../components/products/HowToApply"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});
const Footer = dynamic(() => import("../../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function ProductPage() {
  const { router, asPath } = useRouter();
  // const { component } = router.query

  const { data, error } = useSWR(`/api/page/${asPath}`, fetcher);

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const IndividualBanner = data?.individualProducts;
  const ProductDescription = data?.individualProducts?.businessLoanDescription;
  const ProductContent = data?.individualProducts?.productsContent;
  const RequirementsData = data?.individualProducts?.requirements;
  const HowToApply = data?.individualProducts?.howToApply;
  const WhoShould = data?.individualProducts?.whoShould;

  return (
    <>
      <Head>
        <title>Products We Offer</title>
      </Head>
      <Header />
      <div className="float-left clear-both w-full">
        <ProductBanner data={IndividualBanner} />
      </div>

      <div className="w-full clear-both float-left" ref={observe}>
        {inView && (
          <Content content={ProductContent} desc={ProductDescription} />
        )}
      </div>
      <div className="w-full clear-both float-left" ref={observe}>
        {inView && <Requirements data={RequirementsData} />}
      </div>
      <div className="w-full clear-both float-left" ref={observe}>
        {inView && <How data={HowToApply} />}
      </div>
      <div className="w-full clear-both float-left" ref={observe}>
        {inView && <Who data={WhoShould} />}
      </div>
      <div className="w-full clear-both float-left" ref={observe}>
        {inView && <GroupColumn />}
      </div>
      <div className="w-full clear-both float-left" ref={observe}>
        {inView && <FAQ />}
      </div>
      {/* <div ref={observe}>{inView && <Footer />}</div> */}
      <div className="float-left clear-both w-full" ref={observe}>
        {inView && <Footer />}
      </div>
    </>
  );
}
