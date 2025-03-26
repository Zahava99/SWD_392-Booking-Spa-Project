import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const BlogPost = ({ image, title, content, date, author }) => {
  return (
    <div className="blog-post justify-content-center">
      <div className="blog-post-image">
        <img className="img-fluid" src={image} alt={title} />
      </div>
      <div className="blog-post-content">
        <div className="blog-post-details pb-0">
          <div className="blog-post-title">
            <h4>
              <Link to="/blog-single">{title}</Link>
            </h4>
            <p className="mb-0 mt-3">{content}</p>
          </div>
          <div className="mt-3 d-flex">
            <Link className="btn-link" to="/blog-single">
              Read More <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
          <div className="blog-post-time">
            <i className="far fa-clock"></i>
            <a href="#">{date}</a>
            <i className="far fa-user ps-3"></i>
            <a href="#">{author}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogPost.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default BlogPost;
