import Layout from '../../components/layout';

import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticPaths() {
    const paths = getAllPostIds();
    console.log("paths",paths);
    return {
      paths,
      fallback: false,
    };
  }
export async function getStaticProps({ params }) {
    console.log(params);
    const postData = getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
  }
export default function Post({ postData }) {
  return (
    <Layout>
    {postData.title}
    <br />
    {postData.id}
    <br />
    {postData.date}
  </Layout>)
}