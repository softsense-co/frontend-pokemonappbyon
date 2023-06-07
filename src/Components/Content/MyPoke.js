import axios from "axios";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

function MyPoke() {
  const [myPoke, setMyPoke] = useState([]);

  const getMyPokemons = async () => {
    try {
      const getAuthToken = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken}`, // Sertakan token autentikasi dalam header permintaan
        },
      };
      const response = await axios.get(
        `http://localhost:4000/pokemons/collection/`,
        config
      );
      console.log("response", response.data);
      const mypokemonList = response.data.data;
      setMyPoke(mypokemonList);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("======MyPoke", myPoke);
  console.log("======MyPoke length", myPoke.length);

  useEffect(() => {
    getMyPokemons();
  }, []);

  //fungsi delete local storage yg simple dan diambil berdasarkan id  dan memiliki kelemahan
  // karna parameters "id" yang di set sedangkan pada local storage itu menggunakan key mypokemons
  //sehingga dia perlu mencari key yang sesuai di mypokemons
  // Fungsi filter digunakan untuk membuat array baru dengan semua elemen yang memenuhi kondisi yang diberikan.
  //  Dalam hal ini, kondisinya adalah bahwa id dari setiap pokemon yang diproses dalam loop (p.id) tidak sama dengan
  // id pokemon yang ingin dihapus (pokemon.id).
  //Dengan menghapus pokemon dari array updatedMyPokemon, dan kemudian mengubah nilai state myPokemon menjadi array yang
  // baru, kita dapat menghapus pokemon dari tampilan halaman.

  /* const deletePokemon = (id) => {
        const updatedPokemons = myPokemon.filter(pokemon => pokemon.id !== id);
        setMyPokemons(updatedPokemons);
        localStorage.setItem("myPokemon", JSON.stringify(updatedPokemons));
    } */

  /* Sementara pada kode yang dibawah yang gunakan, fungsi deletePokemon menerima parameter berupa objek pokemon, 
    sehingga tidak perlu mencari key di localStorage. Selain itu, kode tersebut juga membuat salinan 
    array sebelum melakukan operasi penghapusan, sehingga tidak mengubah state langsung dan lebih aman untuk digunakan. */

  const deletePokemon = async (id) => {
    try {
      console.log("test id", id);
      const response = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Pokemon!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      });

      console.log("response", response.data);

      if (response.isConfirmed) {
        await axios.delete(`http://localhost:4000/pokemons/collection/${id}`);
        Swal.fire("Deleted!", "Your Pokemon has been deleted.", "success");

        const updatedMyPokemons = myPoke.filter(poke => poke.id !== id);
        setMyPoke(updatedMyPokemons);
      } else {
        Swal.fire("Cancelled", "Your Pokemon is safe!", "info");
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="container mx-auto mt-9">
      <h1 className="text-5xl font-bold p-5 ml-5 text-center text-neutral-700">
        My Pokemon List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-9 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {myPoke.length > 0 &&
          myPoke.map((poke) => (
            <div className="flex justify-center" key={poke.id}>
              <div className="card w-96 shadow-xl rounded-lg p-4 mb-10">
                <div className="card p-9 rounded-lg shadow-xl">
                  <img
                    src={poke.image}
                    alt=""
                    className="rounded-t-lg mt-2 mb-2 text-black w-[200px] h-[200px]"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-black text-center">
                    {poke.name}
                  </h2>
                  <button
                    onClick={() => deletePokemon(poke.id)}
                    className="btn rounded text-black mt-2 w-full"
                  >
                    Delete Pokemon
                  </button>
                  {/* <a href={`/detail/${poke.name}`} className="btn rounded text-black">
                    see
                  </a> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyPoke;
