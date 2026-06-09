import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const Single = () => {
  const { type, uid } = useParams();
  const [item, setItem] = useState(null);

  const getImageUrl = () => {
    if (type === "people") {
      return "https://placehold.co/800x600/222/FFE81F?text=Character";
    }

    if (type === "planets") {
      return "https://placehold.co/800x600/1b4965/ffffff?text=Planet";
    }

    if (type === "vehicles") {
      return "https://placehold.co/800x600/333533/ffffff?text=Vehicle";
    }

    return "https://placehold.co/800x600?text=Star+Wars";
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

  const getVisibleProperties = () => {
    if (!properties) return [];

    if (type === "people") {
      return [
        ["Name", properties.name],
        ["Gender", properties.gender],
        ["Birth Year", properties.birth_year],
        ["Height", properties.height],
        ["Mass", properties.mass],
        ["Hair Color", properties.hair_color],
        ["Skin Color", properties.skin_color],
        ["Eye Color", properties.eye_color]
      ];
    }

    if (type === "planets") {
      return [
        ["Name", properties.name],
        ["Climate", properties.climate],
        ["Terrain", properties.terrain],
        ["Population", properties.population],
        ["Diameter", properties.diameter],
        ["Gravity", properties.gravity],
        ["Orbital Period", properties.orbital_period],
        ["Rotation Period", properties.rotation_period]
      ];
    }

    if (type === "vehicles") {
      return [
        ["Name", properties.name],
        ["Model", properties.model],
        ["Manufacturer", properties.manufacturer],
        ["Cost", properties.cost_in_credits],
        ["Length", properties.length],
        ["Crew", properties.crew],
        ["Passengers", properties.passengers],
        ["Vehicle Class", properties.vehicle_class]
      ];
    }

    return [];
  };

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
        {getVisibleProperties().map(([label, value]) => (
          <div className="col-md-3 mb-4" key={label}>
            <strong>{label}</strong>
            <p className="mb-0">{value}</p>
          </div>
        ))}
      </div>

      <Link to="/">
        <button className="btn btn-primary mt-3">Back home</button>
      </Link>
    </div>
  );
};