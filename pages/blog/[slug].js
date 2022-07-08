import { GraphQLClient, gql } from "graphql-request";
import React from "react";
import PostComponent from "../../components/PostComponent";
const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl4rueg1b1kxe01zc1hute3rg/master"
);

function BlogDetail({ posts }) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <PostComponent title={post.title} blogContent={post.content.html} />
        </div>
      ))}
    </>
  );
}

export default BlogDetail;

export const getStaticProps = async ({ params }) => {
  const slugId = params.slug;
  const { posts } = await graphcms.request(gql`
    {
      posts(where: { slug:"${slugId}"  }) {
        id
        title
        content{
            html
        }
      }
    }
  `);
  console.log(posts);
  return {
    props: {
      posts: posts,
    },
    revalidate: 5,
  };
};

export const getStaticPaths = async () => {
  const { posts } = await graphcms.request(gql`
    {
      posts {
        slug
      }
    }
  `);
  console.log(posts);
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: true,
  };
};
