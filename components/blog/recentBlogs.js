import Link from "next/link";
//GraphQL components and moduless
import { gql } from "@apollo/client";
import useSWR from "swr";
import { request } from "graphql-request";

const fetcher = (query) =>
  request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const RecentBlogs = () => {
  const { data, error } = useSWR(
    `query RecentPosts {
        posts(first: 5) {
            nodes {
            title
            slug
            }
        }
    }`,
    fetcher
  );
  // console.log(post.title);

  if (error) return <div> error.... </div>;
  if (!data) return <div> Loading.... </div>;
  const recentPosts = data?.posts?.nodes;

  return (
    <div className="p-8">
      <div className="text-2xl uppercase text-green-900 text-left">
        LATEST FROM KAPITUS
      </div>
      <div className="p-8">
        {recentPosts.map((post, key) => {
          return (
            <Link href={`/blog/${post.slug}`} key={key} passHref>
              <div className="mt-2 text-lg text-blue-900">{post.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecentBlogs;
