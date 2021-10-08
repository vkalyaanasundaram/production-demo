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

  return (
    <>
      <Head>
        <title>Products We Offer</title>
      </Head>
      <Header />
      <div className="float-left clear-both w-full">
        <div ref={observe}>
          {inView && <ProductBanner data={IndividualBanner} />}
        </div>
      </div>
      <section className="float-left clear-both w-full">
        <div ref={observe}>
          {inView && (
            <Content content={ProductContent} desc={ProductDescription} />
          )}
        </div>
      </section>
      <section className="float-left clear-both w-full">
        <div ref={observe}>
          {inView && <Requirements data={RequirementsData} />}
        </div>
      </section>
      {/* <div ref={observe}>{inView && <GroupColumn />}</div>
        <div className="w-full clear-both float-left">
          <div ref={observe}>{inView && <FAQ />}</div>
        </div> */}
    </>
  );
}
