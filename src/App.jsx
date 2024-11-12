import { Link, useNavigate } from "react-router-dom";
 
//import routes
import Routes from "./routes";
 
export default function App() {

  const navigate = useNavigate();

  // Fungsi logout untuk menghapus token dan mengarahkan pengguna ke halaman login
  const logoutHandler = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('token');
    
    // Redirect ke halaman login
    navigate('/login');
  };
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
          <div className="container">
            <Link to="/home" className="navbar-brand">
              HOME
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    to="/posts"
                    className="nav-link active"
                    aria-current="page"
                  >
                    Anime
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <button
                    className="btn btn-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
 
      <Routes />
    </>
  );
}