import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useSWR from "swr";
import { request } from "graphql-request";

// import Banner from "../components/banner";
// import ProductBanner from '../components/products/banner'
// import Products from '../components/products'
import Content from "../components/Content";
// import Accordion from '../components/Accordion'
import FinanceSolutions from "../components/FinanceSolution";
import ContactUs from "../components/pages/ContactUs";
import MediaCenter from "../components/pages/MediaCenter";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const SinglePage = () => {
  const { asPath, pathname } = useRouter();

  const { data, error } = useSWR(
    `query MyQuery {
      page(idType: URI, id: "${asPath}") {
        title
        uri
        ThreeColumnStaticPage {
          cards {
            cardContent
            cardTitle
            svgIcon {
              sourceUrl
            }
          }
          banner {
            bannerButton
            bannerDescription
            bannerTitle
            fieldGroupName
            bannerImage {
              sourceUrl
            }
          }
          
          financeSolution
        }
        accordionData {
          accordion {
            accordionContent
            accordionTitle
          }
        }
        ACFcontact {
          form
          image {
            sourceUrl
          }
        }
      }
    }
    `,
    fetcher
  );

  if (error) return <div> error.... </div>;
  if (!data) return <div> Loading.... </div>;

  if (asPath == "/contact-us") {
    return (
      <div>
        <div className="float-left w-full">
          <ContactUs data={data.page.ACFcontact} />
        </div>
      </div>
    );
  } else if (asPath == "/partner") {
    return (
      <>
        {/* <Banner data={data?.page?.ThreeColumnStaticPage?.banner} /> */}
        <Content data={data?.page?.ThreeColumnStaticPage?.cards} />
        {/* <Accordion data={data?.page?.accordionData} /> */}
        <FinanceSolutions />
      </>
    );
  } else if (asPath == "/media-center") {
    return (
      <>
        <MediaCenter />
      </>
    );
  } else if (asPath == "/developer-documentation") {
    return (
      <>
        <div>
          <iframe
            id="typeform-full"
            src="https://sandbox.kapitus.com/docs/"
            width="100%"
            height="650px"
            frameBorder="0"
          ></iframe>
        </div>
      </>
    );
  } else if (asPath == "/events") {
    return (
      <>{/* <Banner data={data?.page?.ThreeColumnStaticPage?.banner} /> */}</>
    );
  } else {
    return (
      <>
        <Header />
        {/* <Banner data={data?.page?.ThreeColumnStaticPage?.banner} /> */}
        <Content data={data?.page?.ThreeColumnStaticPage?.cards} />
        <FinanceSolutions />
      </>
    );
  }
};

export default SinglePage;
