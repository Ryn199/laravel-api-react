import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

export default function AnimeCreate() {
  // State untuk data anime
  const [image, setImage] = useState("");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [rating, setRating] = useState("");

  // State untuk validasi error
  const [errors, setErrors] = useState([]);

  // Navigate untuk pindah ke halaman lain setelah sukses
  const navigate = useNavigate();

  // Menangani perubahan file gambar
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Method untuk menyimpan data anime baru
  const storeAnime = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("sinopsis", sinopsis);
    formData.append("rating", rating);

    // Kirim data menggunakan API
    await api
      .post("/api/posts", formData)
      .then(() => {
        navigate("/posts");
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={storeAnime}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control"
                  />
                  {errors.image && (
                    <div className="alert alert-danger mt-2">
                      {errors.image[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Judul</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Judul Anime"
                  />
                  {errors.judul && (
                    <div className="alert alert-danger mt-2">
                      {errors.judul[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Deskripsi</label>
                  <textarea
                    className="form-control"
                    onChange={(e) => setDeskripsi(e.target.value)}
                    rows="3"
                    placeholder="Deskripsi Anime"
                  ></textarea>
                  {errors.deskripsi && (
                    <div className="alert alert-danger mt-2">
                      {errors.deskripsi[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Sinopsis</label>
                  <textarea
                    className="form-control"
                    onChange={(e) => setSinopsis(e.target.value)}
                    rows="5"
                    placeholder="Sinopsis Anime"
                  ></textarea>
                  {errors.sinopsis && (
                    <div className="alert alert-danger mt-2">
                      {errors.sinopsis[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control"
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rating Anime"
                  />
                  {errors.rating && (
                    <div className="alert alert-danger mt-2">
                      {errors.rating[0]}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-md btn-primary rounded-sm shadow border-0"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
