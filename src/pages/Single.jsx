import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Single = () => {
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);

  const getImageUrl = () => {
    if (type === "people") {
      return `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;
    }

    if (type === "planets") {
      return `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;
    }

    if (type === "vehicles") {
      return `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`;
    }

    return "";
  };

  const getDetails = async () => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
      const data = await response.json();

      setItem(data.result);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [type, uid]);

  if (!item) {
    return (
      <div className="container mt-5">
        <h2>Loading...</h2>
      </div>
    );
  }

  const properties = item.properties;

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src={getImageUrl()}
            alt={properties.name}
            className="img-fluid rounded"
            onError={(event) => {
              event.target.src = "https://placehold.co/800x600?text=Star+Wars";
            }}
          />
        </div>

        <div className="col-md-6 text-center">
          <h1>{properties.name}</h1>
          <p>
            This is a Star Wars {type} entry from SWAPI. Explore the details
            below to learn more about this item.
          </p>
        </div>
      </div>

      <hr className="my-4 text-danger" />

      <div className="row text-danger text-center">
        {Object.entries(properties)
          .filter(([key]) => key !== "created" && key !== "edited" && key !== "url")
          .map(([key, value]) => (
            <div className="col-md-2 mb-3" key={key}>
              <strong className="text-capitalize">
                {key.replaceAll("_", " ")}
              </strong>
              <p>{value}</p>
            </div>
          ))}
      </div>

      <Link to="/">
        <button className="btn btn-primary mt-3">Back home</button>
      </Link>
    </div>
  );
};