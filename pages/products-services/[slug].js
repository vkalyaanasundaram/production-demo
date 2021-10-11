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
const InvoiceBannerNav = dynamic(() =>
  import("../../components/products/InvoiceBanner")
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

const InvoiceGroupColumn = dynamic(
  () => import("../../components/products/InvoiceGroup"),
  {
    loading: function ld() {
      return <p>Loading...</p>;
    },
    ssr: false,
  }
);
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
  const individualProducts = data?.individualProducts;
  const IndividualBanner = data?.individualProducts;
  const ProductDescription = data?.individualProducts?.businessLoanDescription;
  const ProductContent = data?.individualProducts?.productsContent;
  const RequirementsData = data?.individualProducts?.requirements;
  const HowToApply = data?.individualProducts?.howToApply;
  const WhoShould = data?.individualProducts?.whoShould;

  // invoiceTemplate
  const invoiceTemplate = data?.invoiceTemplate;
  const InvoiceBanner = data?.invoiceTemplate;
  const InvoiceGroupColumnOne = data?.invoiceTemplate?.groupColumn;
  const InvoiceGroupColumnTwo = data?.invoiceTemplate?.groupColumnTwo;

  if (individualProducts) {
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
  } else {
    return (
      <>
        <Header />

        <div className="float-left clear-both w-full">
          <InvoiceBannerNav data={InvoiceBanner} />
        </div>
        <div className="container">
          <div className="float-left clear-both w-full" ref={observe}>
            {inView && (
              <InvoiceGroupColumn
                columnone={InvoiceGroupColumnOne}
                columnTwo={InvoiceGroupColumnTwo}
              />
            )}
          </div>
        </div>
        <div className="container">
          <h3>READY TO APPLY? </h3>
          If invoice factoring seems like the right fit for you, let’s get you
          ready to apply. To begin the application, you will need to be able to
          provide an accounts receivable/payable aging report, articles of
          incorporation or partnership agreement, personal or corporate tax
          return and personal or corporate financial statement. Also, be sure to
          check the credit of your commercial clients. Invoice factoring does
          not pull your credit, but your commercial clients’ credit must be in
          good standing. Additional documentation will likely be required as you
          move through the underwriting process. If you’re still not sure that
          invoice factoring is right for you, you can use our financing matching
          tool or give us a call at (800) 780-7133 to speak with one of our
          financing specialists.
        </div>
      </>
    );
  }
}
