import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const addPoke = async (pokemon) => {
  try {
    const getLocalStorageToken = localStorage.getItem("authToken");
    console.log(getLocalStorageToken, "token");

    const config = {
      headers: {
        Authorization: `Bearer ${getLocalStorageToken}`,
      },
    };

    const bodyParameters = {
      id_pokemons: pokemon.id,
    };

    const existingDataDb = await axios.get('http://localhost:4000/pokemons/collection', {
      headers: {
        Authorization: `Bearer ${getLocalStorageToken}`
      },  
      params: {
        id_pokemons: pokemon.id,
       },
    });
    console.log(existingDataDb, "existingdata");

    if (
      existingDataDb.data.data.find((data) => data.pokemons_id === pokemon.id)
    ) {
      Swal.fire("Error", "Pokemon already exists", "error");
      return;
    }

    const response = await axios.post(
      "http://localhost:4000/pokemons/collection", bodyParameters, config
    );
    Swal.fire("Success", "Pokemon Added", "success");
    console.log("Data berhasil ditambahkan ke database:", response.data);
  } catch (error) {
    console.log("Gagal menambahkan data ke database:", error.message);
  }
};

function Detail() {
  const { id } = useParams();
  console.log("id params: ", id);
  const [pokemons, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemonDetail = async () => {
      try {
        const pokemonResponse = await axios.get(
          `http://localhost:4000/pokemons/${id}`
        );
        console.log(pokemonResponse,'pokemon response');

        const pokemonData = pokemonResponse.data.data;
        console.log(pokemonData, "pokemon data : ");
        setPokemon(pokemonData);

        setIsLoading(false); // Menandakan loading telah selesai
      } catch (error) {
        console.log(error);
      }
    };

    getPokemonDetail();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close();
  }

  if (!pokemons) {
    return <div className="text-black"></div>;
  }

  return (
    <div className="container mx-auto mt-9">
      <h1 className="text-5xl font-bold p-5 ml-5 text-center text-neutral-700">
        Pokemon Wowo
      </h1>
      <div className="flex justify-center mt-4">
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className="card w-auto shadow-xl rounded-lg p-4 mb-80"
          >
            <div className="flex">
              <div className="">
                <div className="card p-9 rounded-lg shadow-xl">
                  <img src={pokemon.image} alt={pokemon.name} className="" />
                  <h2 className="text-lg font-bold text-center text-black mt-4">
                    {pokemon.name}
                  </h2>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    className="btn rounded text-black"
                    onClick={() => addPoke(pokemon)}
                  >
                    Add Pokemon
                  </button>
                </div>
              </div>
              <div className="w-1/2">
                <div className="mt-4 ml-5">
                  <div className="mb-4">
                    <span className="text-gray-700 font-bold">Name:</span>
                    <span className="text-gray-600 ml-2">{pokemon.name}</span>
                  </div>
                  {/* <div className="mb-4">
                <span className="text-gray-700 font-bold">Height:</span>
                <span className="text-gray-600 ml-2">{pokemons.height}</span>
              </div> */}
                  <div>
                    <span className="text-gray-700 font-bold">Moves:</span>
                    <span className="text-gray-600 ml-2">{pokemon.moves}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail;
