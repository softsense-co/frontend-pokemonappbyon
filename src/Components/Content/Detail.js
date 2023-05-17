import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function addPoke(pokemon) {
  Swal.fire({
    title: "Confirmation",
    text: "Sure you want to add this Pokemon?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    reverseButtons: true,
  }).then((result) => {
    if (result.value) {
      // Ambil data dari local storage (jika ada)
      console.log("pokemon", pokemon);
      let myPokemonList =
        JSON.parse(localStorage.getItem("myPokemonList")) || [];
      const isDataExist = myPokemonList.find((p) => p.name === pokemon.name);

      if (isDataExist) {
        Swal.fire({
          title: "Error",
          text: "Pokemon Already Exist!",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        // Tambahkan pokemon yang dipilih ke dalam array myPokemon
        myPokemonList.push(pokemon);
        localStorage.setItem("myPokemonList", JSON.stringify(myPokemonList));

        Swal.fire({
          title: "Success",
          text: "Successfully Added My Pokemon!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    }
  });
}

function Detail() {
  const { name } = useParams();
  // console.log("name", name)
  //   console.log("id" , id)
  const [pokemons, setPokemon] = useState(null);

  useEffect(() => {
    getPokemonDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPokemonDetail = async () => {
    try {
      // Mengambil data pokemon
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const pokemonData = pokemonResponse.data;

      // Mendapatkan ability dari pokemon
      const abilityUrls = pokemonData.abilities.map(
        (ability) => ability.ability.url
      );
      const abilityResponses = await Promise.all(
        abilityUrls.map((url) => axios.get(url))
      );
      const abilities = abilityResponses.map((response) => response.data);

      const pokemonImage =
        pokemonResponse.data.sprites.other.dream_world.front_default;
      const pokemonWeight = pokemonData.weight;
      const pokemonHeight = pokemonData.height;
      const pokemonMove = pokemonData.moves.map((move) => move.move.name);

      // Mengupdate state pokemon
      setPokemon({
        name: pokemonData.name,
        abilities: abilities,
        image: pokemonImage,
        weight: pokemonWeight,
        height: pokemonHeight,
        moves: pokemonMove,
        // Tambahkan data lain yang Anda inginkan
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!pokemons) {
    return <div className="text-black">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-9">
      <h1 className="text-5xl font-bold p-5 ml-5 text-center text-neutral-700">
        Pokemon Wowo
      </h1>
      <div className="flex justify-center mt-4">
        <div className="card w-auto shadow-xl rounded-lg p-4 mb-80">
          <div className="flex">
            <div className="">
              <div className="card p-9 rounded-lg shadow-xl">
                <img src={pokemons.image} alt={pokemons.name} className="" />
                <h2 className="text-lg font-bold text-center text-black mt-4">
                  {pokemons.name}
                </h2>
              </div>
              <div className="flex justify-center items-center mt-4">
                <button
                  className="btn rounded text-black"
                  onClick={() => addPoke(pokemons)}
                >
                  Add Pokemon
                </button>
              </div>
            </div>
            <div className="w-1/2">
              <div className="mt-4 ml-5">
                <div className="mb-4">
                  <span className="text-gray-700 font-bold">Weight:</span>
                  <span className="text-gray-600 ml-2">{pokemons.weight}</span>
                </div>
                <div className="mb-4">
                  <span className="text-gray-700 font-bold">Height:</span>
                  <span className="text-gray-600 ml-2">{pokemons.height}</span>
                </div>
                <div>
                  <span className="text-gray-700 font-bold">Moves:</span>
                  <span className="text-gray-600 ml-2">
                    {pokemons.moves.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
