import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";

function Poke() {
  // const pokemons = [

  //   {
  //     id: "1",
  //     name: "Pokemon Api",
  //     image: require("../../img/11.png"),
  //     price: "$30",
  //   },
  //   {
  //     id: "2",
  //     name: "Pokemon Air",
  //     image: require("../../img/13.png"),
  //     price: "$20",
  //   },
  //   {
  //     id: "3",
  //     name: "Pokemon Angin",
  //     image: require("../../img/16.png"),
  //     price: "$25",
  //   },
  //   {
  //     id: "4",
  //     name: "Pokemon Udara",
  //     image: require("../../img/12.png"),
  //     price: "$39",
  //   },
  //   {
  //     id: "5",
  //     name: "Pokemon Batu",
  //     image: require("../../img/15.png"),
  //     price: "$36",
  //   },
  //   {
  //     id: "6",
  //     name: "Pokemon Tangan",
  //     image: require("../../img/14.png"),
  //     price: "$40",
  //   },
  //   {
  //     id: "7",
  //     name: "Pokemon Wowo",
  //     image: require("../../img/17.webp"),
  //     price: "$45",
  //     isNew: true,
  //   },
  //   {
  //     id: "8",
  //     name: "Pokemon Wewe",
  //     image: require("../../img/18.webp"),
  //     price: "$50",
  //     isNew: true,
  //   },
  //   {
  //     id: "9",
  //     name: "Pokemon Wiwi",
  //     image: require("../../img/9.png"),
  //     price: "$45",
  //     isNew: true,
  //   },
  //   {
  //     id: "10",
  //     name: "Pokemon Wawa",
  //     image: require("../../img/10.png"),
  //     price: "$50",
  //     isNew: true,
  //   },
  // ];

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const pokemonList = response.data.results;
        const pokemonData = [];

        for (const pokemon of pokemonList) {
          const pokemonResponse = await axios.get(pokemon.url);
          const pokemonImage =
            pokemonResponse.data.sprites.other.dream_world.front_default;

          pokemonData.push({
            name: pokemon.name,
            image: pokemonImage,
          });
        }

        setPokemons(pokemonData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPokemons();
  }, []);

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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Adding Pokemon Cancelled!",
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    });
  }

  return (
    <div>
      <h1 className="text-5xl font-bold p-5 mt-8 ml-5 text-center text-neutral-700">
        Pokemon Wowo
      </h1>
      <div className="container mx-auto mt-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {pokemons.map((pokemon, index) => (
            <div key={index} className="card shadow-xl rounded-lg p-4 mb-10">
              {pokemon.isNew && (
                <div className="bg-blue-400 text-black px-2 py-1 rounded-full absolute -top-2 -right-2">
                  New
                </div>
              )}
              <div className="card p-9 rounded-lg shadow-xl">
                <img
                  src={pokemon.image}
                  alt=""
                  className="rounded-t-lg mt-4 w-[200px] h-[200px]"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-black text-center">
                  {pokemon.name}
                </h2>
                {/* <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Price:</p>
                  <p className="text-gray-800">{pokemon.price}</p>
                </div> */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => addPoke(pokemon)}
                    className="btn rounded text-black mr-16"
                  >
                    +
                  </button>
                  <a href={`/detail/${pokemon.name}`} className="btn rounded text-black">
                    detail
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Poke;
