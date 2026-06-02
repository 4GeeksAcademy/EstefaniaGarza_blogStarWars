import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  const removeFavorite = (favorite) => {
    dispatch({
      type: "remove_favorite",
      payload: {
        uid: favorite.uid,
        type: favorite.type
      }
    });
  };

  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Star Wars
        </Link>

        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites {store.favorites.length}
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            {store.favorites.length === 0 ? (
              <li>
                <span className="dropdown-item text-muted">
                  No favorites yet
                </span>
              </li>
            ) : (
              store.favorites.map((favorite) => (
                <li
                  key={`${favorite.type}-${favorite.uid}`}
                  className="dropdown-item d-flex justify-content-between align-items-center gap-3"
                >
                  <Link
                    to={`/single/${favorite.type}/${favorite.uid}`}
                    className="text-decoration-none"
                  >
                    {favorite.name}
                  </Link>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFavorite(favorite)}
                  >
                    🗑
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};