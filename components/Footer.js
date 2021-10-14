import Link from "next/link";
import useSWR from "swr";
import { request } from "graphql-request";
import { useRouter } from "next/router";
import {
  FooterNav,
  FooterContent,
  contentNav,
} from "../styles/Home.module.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Footer = () => {
  const { data, error } = useSWR("/api/page/footer", fetcher);
  const footerMenu = data?.menuItems?.nodes;
  const productMenus = data?.productsServices?.nodes;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <>
      <div>
        <div className="container py-2 px-5">
          <section className="float-left clear-both">
            <div className="container">
              <footer className="text-gray-600 body-font">
                <div className="container px-5 mx-auto">
                  <div className="flex flex-wrap md:text-left text-center order-first">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                      <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                        <Link href="/about-us" passHref>
                          ABOUT US
                        </Link>
                      </h2>
                      <nav className="list-none mb-10">
                        {footerMenu.map((value, index) => (
                          <div className="text-gray-50" key={index}>
                            <li className="text-black text-base leading-8">
                              <Link href={value.url} passHref prefetch={false}>
                                {value.label}
                              </Link>
                            </li>
                          </div>
                        ))}
                      </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                      <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                        PRODUCTS
                      </h2>
                      <nav className="list-none mb-10">
                        {productMenus.map((value, index) => (
                          <div className="text-gray-50" key={index}>
                            <li className="text-black text-base leading-8">
                              <Link
                                href={"/products-services/" + value.slug}
                                passHref
                                prefetch={false}
                              >
                                {value.title}
                              </Link>
                            </li>
                          </div>
                        ))}
                      </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                      <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                        CONTACT US
                      </h2>
                      <nav className="list-none mb-10">
                        <li>
                          <a className="text-gray-600 hover:text-gray-800">
                            Call Us
                          </a>
                        </li>
                        <li>
                          <a className="text-gray-600 hover:text-gray-800">
                            Email
                          </a>
                        </li>
                      </nav>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                      <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                        SUBSCRIBE
                      </h2>
                      <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
                        <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
                          <label
                            htmlFor="footer-field"
                            className="leading-7 text-sm text-gray-600"
                          >
                            Placeholder
                          </label>
                          <input
                            type="text"
                            id="footer-field"
                            name="footer-field"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                        <button className="lg:mt-2 xl:mt-0 flex-shrink-0 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                          Button
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mt-2 md:text-left text-center">
                        Bitters chicharrones fanny pack
                        <span className="lg:block hidden">
                          waistcoat green juice
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-100">
                  <div className="container text-sm">
                    Copyright@2021 Kapitus, LLC or its affiliates.&nbsp;All
                    rights reserved.&nbsp;Kapitus, LLC, Kapitus.com, and the
                    Kapitus logo are registered trademarks of Kapitus, Inc. or
                    its affiliates. | Loans made in California are issued by
                    Strategic Funding Source, Inc. dba Kapitus, pursuant to
                    California Finance Lenders License No. 603-G807. <br />{" "}
                    <a href="https://kapitus.com/sitemap/">Sitemap</a> |{" "}
                    <a href="https://kapitus.com/terms-conditions/">
                      Terms &amp; Conditions
                    </a>{" "}
                    |{" "}
                    <a href="https://kapitus.com/privacy-policy/">
                      Privacy Policy
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Footer;
