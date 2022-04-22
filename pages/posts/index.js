import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../helpers/post-util";

function AllPostsPage({ posts }) {
  return (
    <>
      <Head>
        <title>All my posts</title>
        <meta name="description" content="All the uploaded posts" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export default AllPostsPage;

export function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
}
