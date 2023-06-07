import Swal from "sweetalert2";
import axios from "axios";
import { useEffect, useState } from "react";

function Poke() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemons() {
      try {
        setIsLoading(true);

        // const response = await axios.get('http://pokeapi.co/api/v2/pokemon');
        const getAuthToken = localStorage.getItem("authToken");
        const config = {
          headers: {
            Authorization: `Bearer ${getAuthToken}`, // Sertakan token autentikasi dalam header permintaan
          },
        };
        const response = await axios.get(
          "http://localhost:4000/pokemons",
          config
        );
        console.log(response.data, "<=== response data");
        const pokemonList = response.data.data;

        setPokemons(pokemonList);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }

    fetchPokemons();
  }, []);

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
  
      const existingDataDb = await axios.get(
        "http://localhost:4000/pokemons/collection",
        {
          headers: {
            Authorization: `Bearer ${getLocalStorageToken}`,
          },
          params: {
            id_pokemons: pokemon.id,
          },
        }
      );
      console.log(existingDataDb, "existingdata");
  
      if (existingDataDb.data.data.find((data) => data.pokemons_id === pokemon.id)) {
        Swal.fire({
          title: "Error",
          text: "Pokemon already exists",
          icon: "error",
          timer: 2000,
          showConfirmButton: false
        });
        return;
      }
  
      const response = await axios.post(
        "http://localhost:4000/pokemons/collection",
        bodyParameters,
        config
      );
      Swal.fire("Success", "Pokemon Added", "success");
      console.log("Data berhasil ditambahkan ke database:", response.data);
    } catch (error) {
      console.log("Gagal menambahkan data ke database:", error.message);
    }
  };
  

  useEffect(() => {
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
  }, [isLoading]);

  return (
    <div>
      {isLoading ? (
        <div></div>
      ) : (
        <div>
          <h1 className="text-5xl font-bold p-5 mt-8 ml-5 text-center text-neutral-700">
            Pokemon Wowo
          </h1>
          <div className="container mx-auto mt-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {pokemons.map((pokemon, index) => (
                <div
                  key={index}
                  className="card shadow-xl rounded-lg p-4 mb-10"
                >
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
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => addPoke(pokemon)}
                        className="btn rounded text-black mr-16"
                      >
                        +
                      </button>
                      <a
                        href={`/detail/${pokemon.id}`}
                        className="btn rounded text-black"
                      >
                        detail
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Poke;
