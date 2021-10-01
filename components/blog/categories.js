import Head from 'next/head'
import Link from "next/link";
import React, { useEffect } from "react";
import ReactHtmlParser, {htmlparser2} from "react-html-parser";

//GraphQL components and moduless
import { gql } from '@apollo/client';
import useSWR from "swr";
import { request } from "graphql-request";

const fetcher = (query) => request(process.env.WORDPRESS_GRAPHQL_ENDPOINT, query);

const BlogCategories = () => {
    const { data, error } = useSWR(

    `{
        categories(first: 50) {
            nodes {
                slug
                link
                name
            }
        }
    }
`,
fetcher
);

if (error) return <div> error.... </div>;
if (!data) return <div> Loading.... </div>;
// console.log(data);
const  blogCategory = data.categories.nodes;
// console.log(blogCategory);
    return (
        <div className="p-2">
            <div><h1 className="text-2xl uppercase text-green-900">Categories</h1></div>    
            <div className="p-8">
                {blogCategory.map((post, key) => { 
                    return(
                        <Link href={`/category/${post.slug}`} key={key} passHref>
                            <div className="mt-2 text-lg text-blue-900">
                                {post.name}
                            </div>
                        </Link>
                    )
                    // console.log(post.title);
                })}
            </div>
        </div>
    )

}

export default BlogCategories;