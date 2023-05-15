import React, { useState, useEffect } from "react";

function MyPoke() {
  const [myPoke, setMyPoke] = useState([]);

  const getMyPokemons = () => {
    const savedData = JSON.parse(localStorage.getItem("myPokemonList")) || [];
    if (savedData) {
      setMyPoke(savedData);
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
  // Fungsi filter digunakan untuk membuat array baru dengan semua elemen yang memenuhi kondisi yang diberikan. Dalam hal ini, kondisinya adalah bahwa id dari setiap pokemon yang diproses dalam loop (p.id) tidak sama dengan id pokemon yang ingin dihapus (pokemon.id).
  //Dengan menghapus pokemon dari array updatedMyPokemon, dan kemudian mengubah nilai state myPokemon menjadi array yang baru, kita dapat menghapus pokemon dari tampilan halaman.

  /* const deletePokemon = (id) => {
        const updatedPokemons = myPokemon.filter(pokemon => pokemon.id !== id);
        setMyPokemons(updatedPokemons);
        localStorage.setItem("myPokemon", JSON.stringify(updatedPokemons));
    } */

  /* Sementara pada kode yang dibawah yang gunakan, fungsi deletePokemon menerima parameter berupa objek pokemon, 
    sehingga tidak perlu mencari key di localStorage. Selain itu, kode tersebut juga membuat salinan 
    array sebelum melakukan operasi penghapusan, sehingga tidak mengubah state langsung dan lebih aman untuk digunakan. */

    const deletePokemon = (pokemon) => {
      const confirmation = window.confirm("Sure you want to remove ?");
    
      if (confirmation) {
        // membuat salinan array
        const updatedMyPokemon = [...myPoke];
    
        // mencari index data yang akan dihapus
        const index = updatedMyPokemon.findIndex((p) => p.id === pokemon.id);
    
        // kondisi menghapus data dari array jika ditemukan
        if (index !== -1) {
          updatedMyPokemon.splice(index, 1);
    
          // menyimpan array yang diperbarui ke local storage dengan kunci yang sesuai
          localStorage.setItem("myPokemonList", JSON.stringify(updatedMyPokemon));
    
          // memperbarui state dengan array yang diperbarui
          setMyPoke(updatedMyPokemon);
          alert("Pokemon Got Off!");
        }
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
              <div className="card w-96 shadow-xl rounded-lg p-4">
                <div className="card p-9 rounded-lg shadow-xl">
                  <img
                    src={poke.image}
                    alt=""
                    className="rounded-t-lg mt-2 mb-2 text-black"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-black">{poke.name}</h2>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600 ">Price:</p>
                    <p className="text-gray-800">{poke.price}</p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => deletePokemon(poke)}
                      className="btn rounded-full text-black"
                    >
                      Delete Pokemon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyPoke;
