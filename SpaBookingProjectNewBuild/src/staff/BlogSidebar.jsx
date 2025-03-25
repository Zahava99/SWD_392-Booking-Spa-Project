import { Link } from "react-router-dom";

const BlogSidebar = () => {
  return (
    <div className="blog-sidebar">
      {/* Search Widget */}
      <div className="widget">
        <div className="widget-title">
          <h5>Search</h5>
        </div>
        <div className="search">
          <i className="fas fa-search"></i>
          <input
            type="text"
            className="form-control"
            placeholder="Search here..."
          />
        </div>
      </div>

      {/* Categories Widget */}
      <div className="widget">
        <div className="widget-title">
          <h5>Categories</h5>
        </div>
        <div className="widget-categories">
          <ul className="list-unstyled list-style mb-0">
            <li>
              <Link to="#">
                <i className="fas fa-arrow-right text-primary me-2"></i>
                Face Treatments
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-arrow-right text-primary me-2"></i>
                Massages
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-arrow-right text-primary me-2"></i>
                Body Treatments
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-arrow-right text-primary me-2"></i>
                Hair Removal
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fas fa-arrow-right text-primary me-2"></i>
                Medical Treatments
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Recent Posts Widget */}
      <div className="widget">
        <h5 className="mb-3">Recent post</h5>
        <div className="row">
          <div className="col-12 d-flex mb-3">
            <div className="recent-post-img avatar avatar-lg me-3">
              <img
                className="img-fluid"
                src="/src/staff/assets/images/blog/01.jpg"
                alt=""
              />
            </div>
            <div className="recent-post-info">
              <small className="d-block">January 05, 2024</small>
              <Link className="d-inline-block title" to="/blog-single">
                <b>Pressure Points in Massage Therapy</b>
              </Link>
            </div>
          </div>
          {/* Thêm các bài post gần đây khác tương tự */}
        </div>
      </div>

      {/* Tags Widget */}
      <div className="widget">
        <div className="widget-title">
          <h5>Tags</h5>
        </div>
        <div className="tagcloud">
          <ul className="list-unstyled mb-0">
            <li>
              <Link to="#">Beauty</Link>
            </li>
            <li>
              <Link to="#">Casino</Link>
            </li>
            <li>
              <Link to="#">Group</Link>
            </li>
            <li>
              <Link to="#">Luxury</Link>
            </li>
            <li>
              <Link to="#">Love</Link>
            </li>
            <li>
              <Link to="#">Massage</Link>
            </li>
            <li>
              <Link to="#">Hotel</Link>
            </li>
            <li>
              <Link to="#">Night</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Follow Widget */}
      <div className="widget">
        <div className="widget-title">
          <h5>Follow on</h5>
        </div>
        <div className="social-icon">
          <ul className="list-unstyled">
            <li>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
