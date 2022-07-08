import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";
import React from "react";
import PostComponent from "../../components/PostComponent";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl4rueg1b1kxe01zc1hute3rg/master"
);

function BlogDetail({ title, id, coverPhoto, content }) {
  return (
    <>
      <PostComponent title={title} blogContent={content.html} />
    </>
  );
}

export default BlogDetail;

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const { post } = await graphcms.request(
    gql`
      query {
        post(where: { slug: "${slug}" }) {
          id
          title
            coverPhoto{
              url
            }
            content{
              html
            }
        }} `
  );

  return {
    props: {
      ...post,
    },
  };
}

export async function getStaticPaths() {
  const { posts } = await graphcms.request(
    gql`
      query {
        posts {
          slug
        }
      }
    `
  );

  console.log(posts.map((post) => post.slug));
  return {
    paths: posts.map((post) => "/blog/" + post.slug),
    fallback: true,
  };
}
