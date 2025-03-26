import { Link } from "react-router-dom";
import BlogSidebar from "../staff/BlogSidebar";
import BlogPost from "../staff/BlogPost";
import "../../src/staff/style.css";
const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      image: "../src/staff/assets/images/blog/blog-classic-01.jpg",
      title: "Pressure Points in Massage Therapy",
      content:
        "Once you have chosen your spa quotes, integrate them into your marketing materials. Use them on your website, social media profiles, email newsletters, and printed materials like brochures and posters.",
      date: "February 4, 2021",
      author: "By admin",
    },
    {
      id: 2,
      image: "/src/staff/assets/images/blog/blog-classic-02.jpg",
      title: "The Benefits of Natural Cosmetics",
      content:
        "Social media platforms like Instagram and Facebook are excellent places to share spa quotes. Create visually appealing posts with quotes overlaid on soothing spa-related images. Use relevant hashtags to reach a broader audience.",
      date: "February 4, 2021",
      author: "By admin",
    },
    {
      id: 3,
      image: "/src/staff/assets/images/blog/blog-classic-03.jpg",
      title: "Speed Cleaning Tips From Cleaners",
      content:
        "Inspirational quotes breathe life into your spa, fostering optimism when it is needed most. They make a positive impression on clients and inspire a brighter outlook",
      date: "February 4, 2021",
      author: "By admin",
    },
  ];

  return (
    <>
      {/* Banner Section */}
      <section
        className="inner-header space-ptb bg-holder"
        style={{ backgroundImage: "url(/src/staff/assets/images/bg/02.jpg)" }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h1 className="text-white">Blog</h1>
              <ul className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <Link to="/">
                    <i className="fa fa-home pe-2"></i>Home
                  </Link>
                </li>
                <li className="breadcrumb-item active">
                  <span>Blog</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="space-ptb">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 order-1 order-lg-1 mb-5 mb-lg-0">
              <BlogSidebar />
            </div>
            <div className="col-lg-8 order-2 order-lg-2">
              <div className="row">
                {blogPosts.map((post) => (
                  <div className="col-12" key={post.id}>
                    <BlogPost {...post} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
