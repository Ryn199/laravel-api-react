//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import api from "../../api";

//import Link
import { Link } from "react-router-dom";

export default function PostIndex() {
  // State untuk posts
  const [posts, setPosts] = useState([]);

  // Method untuk fetch data dari API
  const fetchDataPosts = async () => {
    await api.get("/api/posts").then((response) => {
      setPosts(response.data.data.data);
    });
  };

  // Menjalankan hook useEffect
  useEffect(() => {
    fetchDataPosts();
  }, []);

  // Method untuk delete post
  const deletePost = async (id) => {
    await api.delete(`/api/posts/${id}`).then(() => {
      fetchDataPosts();
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-12">
          <Link
            to="/posts/create"
            className="btn btn-md btn-success rounded shadow border-0 mb-3"
          >
            ADD NEW ANIME
          </Link>
        </div>
      </div>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={post.image}
                  alt={post.judul}
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{post.judul}</h5>
                  <p className="card-text">{post.deskripsi}</p>
                  <p className="card-text text-muted">{post.sinopsis}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">Rating: {post.rating}</span>
                    <div>
                      <Link
                        to={`/posts/edit/${post.id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        EDIT
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="btn btn-sm btn-danger"
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-danger text-center">Data Belum Tersedia!</div>
          </div>
        )}
      </div>
    </div>
  );
}
