import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";
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
			<h1>Star Wars Blog</h1>

			<h2 className="text-danger mt-4">Characters</h2>
			<div className="d-flex overflow-auto gap-3">
				{store.people.map((person) => (
					<div className="card" style={{ minWidth: "18rem" }} key={person.uid}>
						<img
							src={`https://starwars-visualguide.com/assets/img/characters/${person.uid}.jpg`}
							className="card-img-top"
							alt={person.name}
						/>
						<div className="card-body">
							<h5 className="card-title">{person.name}</h5>
							<Link to={`/single/people/${person.uid}`} className="btn btn-outline-primary">
								Learn more!
							</Link>
						</div>
					</div>
				))}
			</div>

			<h2 className="text-danger mt-4">Planets</h2>
			<div className="d-flex overflow-auto gap-3">
				{store.planets.map((planet) => (
					<div className="card" style={{ minWidth: "18rem" }} key={planet.uid}>
						<img
							src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
							className="card-img-top"
							alt={planet.name}
						/>
						<div className="card-body">
							<h5 className="card-title">{planet.name}</h5>
							<Link to={`/single/planets/${planet.uid}`} className="btn btn-outline-primary">
								Learn more!
							</Link>
						</div>
					</div>
				))}
			</div>

			<h2 className="text-danger mt-4">Vehicles</h2>
			<div className="d-flex overflow-auto gap-3">
				{store.vehicles.map((vehicle) => (
					<div className="card" style={{ minWidth: "18rem" }} key={vehicle.uid}>
						<img
							src={`https://starwars-visualguide.com/assets/img/vehicles/${vehicle.uid}.jpg`}
							className="card-img-top"
							alt={vehicle.name}
						/>
						<div className="card-body">
							<h5 className="card-title">{vehicle.name}</h5>
							<Link href={`/single/vehicles/${vehicle.uid}`} className="btn btn-outline-primary">
								Learn more!
							</Link>
						</div>
					</div>
				))}
			</div>

			<h2 className="text-danger mt-4">Characters</h2>
			<div className="d-flex overflow-auto gap-3 pb-3">
				{store.people.map((person) => (
					<StarWarsCard key={person.uid} item={person} type="people" />
				))}
			</div>

			<h2 className="text-danger mt-4">Planets</h2>
			<div className="d-flex overflow-auto gap-3 pb-3">
				{store.planets.map((planet) => (
					<StarWarsCard key={planet.uid} item={planet} type="planets" />
				))}
			</div>

			<h2 className="text-danger mt-4">Vehicles</h2>
			<div className="d-flex overflow-auto gap-3 pb-3">
				{store.vehicles.map((vehicle) => (
					<StarWarsCard key={vehicle.uid} item={vehicle} type="vehicles" />
				))}
			</div>

		</div>
	);
};