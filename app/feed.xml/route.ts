import getBlogs from "@/utils/getBlogs";
import RSS from "rss";

export function GET() {
  const blogs = getBlogs();
  const feed = new RSS({
    title: '',
    description: '',
    site_url: '',
    feed_url: '',
    copyright: '',
    language: '',
    pubDate: '',
  });
  
  blogs.map((blog) => {
    feed.item({
      title: blog.data.title,
      url: `https://www.leomosley.com/${blog.data.filename.slice(0, -3)}`,
      date: blog.data.date,
      description: blog.data.description,
      author: process.env.GITHUB_USERNAME,
    });
  });
  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}