import { GraphQLClient, gql } from "graphql-request";
import React from "react";
import PostComponent from "../../components/PostComponent";
const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl4rueg1b1kxe01zc1hute3rg/master"
);

function blogDetail({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <PostComponent title={post.title} blogContent={post.content.html} />
        </div>
      ))}
    </div>
  );
}

export default blogDetail;

export const getStaticProps = async ({ params }) => {
  const slugId = params.slug;
  const { posts } = await graphcms.request(gql`
    {
      posts(where: { slug:"${slugId}"  }) {
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
    fallback: false,
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
    fallback: false,
  };
};
