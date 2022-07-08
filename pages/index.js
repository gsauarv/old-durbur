import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import Blogcard from "../components/Blogcard";
import WrapperContainer from "../components/WrapperContainer";
import Title from "../components/Title";

const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl4rueg1b1kxe01zc1hute3rg/master"
);
const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      coverPhoto {
        url
      }
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }

      createdBy {
        id
        picture
        name
      }
    }
  }
`;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Blog Site</title>
      </Head>

      <WrapperContainer>
        <main>
          {/* Section title text */}
          <Title titleText={"Explore Nepal Through Our Blogs"} />
          <div className="md:grid md:grid-cols-3 md:gap-10">
            {posts.map((post) => (
              <Blogcard
                key={post.id}
                title={post.title}
                slug={post.slug}
                coverPhoto={post.coverPhoto}
                datePublished={post.datePublished}
              />
            ))}
          </div>
        </main>
      </WrapperContainer>
    </div>
  );
}

// use Static props

export async function getStaticProps() {
  const { posts } = await graphcms.request(QUERY);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
