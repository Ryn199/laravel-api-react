import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";

export default function AnimeEdit() {
  // State untuk data anime
  const [image, setImage] = useState("");
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [rating, setRating] = useState("");

  // State untuk validasi error
  const [errors, setErrors] = useState([]);

  // Navigation dan params
  const navigate = useNavigate();
  const { id } = useParams();

  // Mengambil data detail anime berdasarkan ID
  const fetchDetailAnime = async () => {
    await api.get(`/api/posts/${id}`).then((response) => {
      setJudul(response.data.data.judul);
      setDeskripsi(response.data.data.deskripsi);
      setSinopsis(response.data.data.sinopsis);
      setRating(response.data.data.rating);
    });
  };

  // Menggunakan useEffect untuk memuat data
  useEffect(() => {
    fetchDetailAnime();
  }, []);

  // Menangani perubahan file gambar
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Update data anime
  const updateAnime = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("sinopsis", sinopsis);
    formData.append("rating", rating);
    formData.append("_method", "PUT");

    await api
      .post(`/api/posts/${id}`, formData)
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
              <form onSubmit={updateAnime}>
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
                    value={judul}
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
                    value={deskripsi}
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
                    value={sinopsis}
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
                    value={rating}
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
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
