import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const API_URL = "https://mcmapp.online/api/blogs";

// 🔹 Hàm lấy token từ sessionStorage
const getToken = () => sessionStorage.getItem("token");

const BlogPost = ({ image, title, content, date, author }) => {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", url: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Hàm fetch danh sách video từ API
  const fetchVideos = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("⚠️ Token is missing! Please login.");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("❌ Failed to fetch videos!");

      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("⚠️ Error fetching videos:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // 🔹 Hàm xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Hàm xử lý submit (thêm/sửa video)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getToken();
      if (!token) {
        alert("⚠️ Token is missing! Please login.");
        return;
      }

      const requestOptions = {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      };

      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      console.log("📡 Sending request to:", url);
      console.log("📦 Data:", formData);

      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`❌ Failed to save video: ${errorData.message || response.statusText}`);
      }

      const newVideo = await response.json();

      if (editingId) {
        setVideos(videos.map((video) => (video._id === editingId ? newVideo : video)));
      } else {
        setVideos([...videos, newVideo]);
      }

      setEditingId(null);
      setFormData({ name: "", description: "", url: "" });
      setShowForm(false);
    } catch (error) {
      console.error("⚠️ Error saving video:", error.message);
    }
  };

  // 🔹 Hàm xoá video
  const handleDelete = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        alert("⚠️ Token is missing! Please login.");
        return;
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("❌ Failed to delete video");

      setVideos(videos.filter((video) => video._id !== id));
    } catch (error) {
      console.error("⚠️ Error deleting video:", error.message);
    }
  };

  // 🔹 Hàm chỉnh sửa video
  const handleEdit = (video) => {
    setFormData(video);
    setEditingId(video._id);
    setShowForm(true);
  };

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
            <span>{date}</span>
            <i className="far fa-user ps-3"></i>
            <span>{author}</span>
          </div>
        </div>

        {!showForm && <button onClick={() => setShowForm(true)}>➕ Add Video</button>}

        {showForm && (
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Video Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
            <input type="text" name="url" placeholder="Video URL" value={formData.url} onChange={handleChange} required />
            <button type="submit">{editingId ? "🔄 Update Video" : "✅ Add Video"}</button>
            <button type="button" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ name: "", description: "", url: "" }); }}>
              ❌ Cancel
            </button>
          </form>
        )}

        {error ? <p className="error-message">⚠️ {error}</p> : null}

        <div className="video-list">
          {videos.length === 0 ? <p>⚠️ No videos available.</p> : 
            videos.map((video) => (
              <div key={video._id} className="video-item">
                <h3>{video.name}</h3>
                <p>{video.description}</p>
                <iframe width="300" height="200" src={video.url} title={video.name} frameBorder="0" allowFullScreen></iframe>
                <button onClick={() => handleEdit(video)}>✏️ Edit</button>
                <button onClick={() => handleDelete(video._id)}>🗑️ Delete</button>
              </div>
            ))
          }
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
