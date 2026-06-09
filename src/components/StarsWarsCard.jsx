import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const StarWarsCard = ({ item, type }) => {
    const { store, dispatch } = useGlobalReducer();

    const isFavorite = store.favorites.some(
        favorite => favorite.uid === item.uid && favorite.type === type
    );

    const getImageUrl = () => {
        if (type === "people") {
            return "https://placehold.co/400x300/222/FFE81F?text=Character";
        }

        if (type === "planets") {
            return "https://placehold.co/400x300/1b4965/ffffff?text=Planet";
        }

        if (type === "vehicles") {
            return "https://placehold.co/400x300/333533/ffffff?text=Vehicle";
        }

        return "https://placehold.co/400x300?text=Star+Wars";
    };

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch({
                type: "remove_favorite",
                payload: {
                    uid: item.uid,
                    type: type
                }
            });

            return;
        }

        dispatch({
            type: "add_favorite",
            payload: {
                uid: item.uid,
                name: item.name,
                type: type
            }
        });
    };

    return (
        <div className="card" style={{ minWidth: "18rem", maxWidth: "18rem" }}>
            <img
                src={getImageUrl()}
                className="card-img-top"
                alt={item.name}
                style={{ height: "200px", objectFit: "cover" }}
                onError={(event) => {
                    event.target.src = "https://placehold.co/400x300?text=Star+Wars";
                }}
            />

            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>

                <div className="d-flex justify-content-between align-items-center">
                    <Link
                        to={`/single/${type}/${item.uid}`}
                        className="btn btn-outline-primary"
                    >
                        Learn more!
                    </Link>

                    <button
                        className={`btn ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
                        onClick={handleFavorite}
                    >
                        ♥
                    </button>
                </div>
            </div>
        </div>
    );
};