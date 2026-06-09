import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { StarWarsCard } from "../components/StarsWarsCard";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	const getPeople = async () => {
		try {
			const response = await fetch("https://www.swapi.tech/api/people");
			const data = await response.json();

			dispatch({
				type: "set_people",
				payload: data.results
			});
		} catch (error) {
			console.error("Error fetching people:", error);
		}
	};

	const getPlanets = async () => {
		try {
			const response = await fetch("https://www.swapi.tech/api/planets");
			const data = await response.json();

			dispatch({
				type: "set_planets",
				payload: data.results
			});
		} catch (error) {
			console.error("Error fetching planets:", error);
		}
	};

	const getVehicles = async () => {
		try {
			const response = await fetch("https://www.swapi.tech/api/vehicles");
			const data = await response.json();

			dispatch({
				type: "set_vehicles",
				payload: data.results
			});
		} catch (error) {
			console.error("Error fetching vehicles:", error);
		}
	};

	useEffect(() => {
		getPeople();
		getPlanets();
		getVehicles();
	}, []);

	 return (
    <div className="container mt-4">
      <h1 className="mb-4">Star Wars Blog</h1>

      <h2 className="text-danger">Characters</h2>
      <div className="d-flex overflow-auto gap-3 pb-3 mb-4">
        {store.people.map((person) => (
          <StarWarsCard key={person.uid} item={person} type="people" />
        ))}
      </div>

      <h2 className="text-danger">Planets</h2>
      <div className="d-flex overflow-auto gap-3 pb-3 mb-4">
        {store.planets.map((planet) => (
          <StarWarsCard key={planet.uid} item={planet} type="planets" />
        ))}
      </div>

      <h2 className="text-danger">Vehicles</h2>
      <div className="d-flex overflow-auto gap-3 pb-3 mb-4">
        {store.vehicles.map((vehicle) => (
          <StarWarsCard key={vehicle.uid} item={vehicle} type="vehicles" />
        ))}
      </div>
    </div>
  );
};