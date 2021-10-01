import { useQuery, gql } from "@apollo/client";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";

// import RecentBlogs from "../components/blog/RecentBlogs";
import AllBlogs from "../components/blog/allBlogs";
import BlogCategories from "../components/blog/categories";

const Header = dynamic(() => import("../components/Header"), {
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

const GET_POSTS = gql`
  query getPosts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          slug
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          content
        }
      }
    }
  }
`;

const BATCH_SIZE = 10;

export default function InfiniteScrollList() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: BATCH_SIZE, after: null },
    notifyOnNetworkStatusChange: true,
  });

  function fetchMorePosts() {
    fetchMore({ variables: { after: data.posts.pageInfo.endCursor } });
  }

  if (error) {
    return <p>Sorry, an error has occurred. Please reload the page.</p>;
  }

  if (!data && loading) {
    return <p>Loading...</p>;
  }

  if (!data?.posts.edges.length) {
    return <p>No posts have been published.</p>;
  }

  const posts = data.posts.edges.map((edge) => edge.node);
  const haveMorePosts = Boolean(data.posts?.pageInfo?.hasNextPage);

  const config = {
    unstable_runtimeJS: false,
  };

  return (
    <>
      <div className="w-full ">
        <Head>
          <title>Blog - Kapitus</title>
        </Head>
        <Header />
      </div>
      <div className="xs:w-full md:w-3/4 float-left border-2 border-gray-200 ">
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={haveMorePosts}
          loader={<p>Loading...</p>}
          endMessage={<p>✅ All posts loaded.</p>}
        >
          <div className="grid grid-cols-3 gap-4 mt-10">
            {posts?.map((key, index) => (
              <Link href={`/blog/${key.slug}`} passHref key={index}>
                <div className="text-center">
                  {key?.featuredImage?.node?.sourceUrl.length > 0 && (
                    <Image
                      src={key?.featuredImage?.node?.sourceUrl}
                      width={250}
                      height={150}
                      alt="Blogs Image"
                    />
                  )}
                  <div
                    className="text-lg text-blue-900 text-left"
                    style={{ width: 300 }}
                  >
                    {ReactHtmlParser(key.title.substring(0, 50))}...
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
        <div></div>
      </div>

      <div className="xs:hidden md:w-1/4 float-left border-2 border-gray-200 ">
        {/* <RecentBlogs /> */}
        <BlogCategories />
      </div>
      {/* <Footer /> */}
    </>
  );
}
