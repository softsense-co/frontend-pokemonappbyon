import React from "react";

function Poke() {
  const pokemons = [
    {
      name: "Pokemon Api",
      image: require("../../img/11.png"),
      price: "$30",
    },
    {
      name: "Pokemon Air",
      image: require("../../img/13.png"),
      price: "$20",
    },
    {
      name: "Pokemon Angin",
      image: require("../../img/16.png"),
      price: "$20",
    },
    {
      name: "Pokemon Udara",
      image: require("../../img/12.png"),
      price: "$20",
    },
    {
      name: "Pokemon Air",
      image: require("../../img/15.png"),
      price: "$20",
    },
    {
      name: "Pokemon Air",
      image: require("../../img/14.png"),
      price: "$20",
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold p-5 ml-5 text-center text-neutral-600">
        Pokemon Wowo
      </h1>
      >
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 grid-rows-3 p-10 gap-x-10 gap-y-10">
          {pokemons.map((pokemon, index) => (
            <div
              key={index}
              className="card w-96 bg-base-100 shadow-xl rounded-lg" >
              <div className="card p-9 rounded-lg shadow-xl">
                <img
                  src={pokemon.image}
                  alt=""
                  className="rounded-t-lg mt-2 mb-2"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{pokemon.name}</h2>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-gray-600">Price:</p>
                  <p className="text-gray-800">{pokemon.price}</p>
                </div>
                <div className="flex justify-center">
                  <button className="btn btn-primary rounded-full">Add Pokemon</button>
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
