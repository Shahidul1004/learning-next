import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from "../helpers/post-util";
import Head from "next/head";

function HomePage({ posts }) {
  return (
    <>
      <Head>
        <title>Index Page</title>
        <meta name="description" content="Index page for blog site" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export default HomePage;

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
