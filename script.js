

// //if we are in the first page
// if (document.querySelector(".types")) {
// //fetching all types
//     let types = document.querySelector(".types");
//     fetch(`https://pokeapi.co/api/v2/type/`)
//       .then(repo => {
//         return repo.json();
//       })
//       .then(data => {
//         for (let i = 0; i < data.results.length; i++) {
//         //displaying all types in a div
//           let div = document.createElement("div");
//           div.className = "type";
//           div.setAttribute("value", data.results[i].name);
//           div.textContent = data.results[i].name;
//           types.appendChild(div);
//         }
//         document.querySelectorAll(".type").forEach(type => {
//           type.addEventListener("click", function(e) {
//             const typeName = e.target.getAttribute("value");
//             window.location.href = `index2.html?type=${typeName}`;
//           });
//         });
//       });
//   }
  
//   //if we are in the second page
//   if (document.querySelector(".type-details")) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const typeName = urlParams.get('type');
//     if (typeName) {
//       fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
//         .then(respo => respo.json())
//         .then(data => {
//           console.log(data)
//           let start = 0;
//           let end = 25;
//           let numOfPages = Math.ceil(data.pokemon.length / 25);
//           let div = document.createElement("div")
//           div.className = "pages"
//           const typeDetailsDiv = document.querySelector(".type-details");
//           for(let i = 0;i <= numOfPages;i++){
//             div.innerHTML += `<div value="${i}" class ="button">${i}</div>`

//           }
//           console.log(document.querySelectorAll(".pages .button"))
//           document.querySelectorAll(".button").forEach(button => {
//             button.addEventListener("click" , function(e){
//               console.log("clicked")
//               console.log(e.target.getAttribute("value"))
//             })
//           })
//            document.body.appendChild(div)
//           console.log(data.pokemon.length)
//           console.log(numOfPages)    
//           if (data.pokemon.length > 0) {
//             for(let i = start;i < end;i++){
//               const p = document.createElement("p");
//               p.textContent = data.pokemon[i].pokemon.name;
//               p.setAttribute("value",data.pokemon[i].pokemon.name)
//               p.className = "names"
//               document.querySelectorAll(".names").forEach(name =>{
//                 name.addEventListener("click", function(e) {
//                     const Name = e.target.getAttribute("value");
//                     window.location.href = `index3.html?name=${Name}`;
//                   });
//               })
//               typeDetailsDiv.appendChild(p);
//             }
//           } else {
//             typeDetailsDiv.textContent = `No Pokémon found for ${typeName}.`;
//           }
//         })
//         .catch(error => console.error('Error fetching Pokémon data:', error));
//     } else {
//       console.error('Type not found in URL query.');
//     }
//   }

//  // if we are in the thred page
//   if (document.querySelector(".count")){
//     const urlParams = new URLSearchParams(window.location.search);
//     const Name = urlParams.get('name');
//     console.log(Name)
//     fetch(`https://pokeapi.co/api/v2/pokemon/${Name}`)
//     .then(respo => {
//         return respo.json()
//     })
//     .then(data => {
//       let card = document.querySelector(".count")
//         console.log(data)
//         let card_info1 = `
//          <p>${data.name} id${data.id}</p>
//          <img src="${data.sprites.other.dream_world.front_default}" alt="">
//          <p>Height: ${data.height}</p>
//          <div class="sids">
//             <div class="left">
//             <p>type : ${data.types[0].type.name}</p>
//             <p>Weight: ${data.weight}</p>
//          <p>Base Experience: ${data.base_experience}</p>    
//             </div>
//             <div class="right">
//              <p>Stats:</p>
            
//               <p>HP: ${data.stats[0].base_stat}</p>
//               <p>Attack: ${data.stats[1].base_stat}</p>
//               <p>Defense: ${data.stats[2].base_stat}</p>
//               <p>Special Attack: ${data.stats[3].base_stat}</p>
//               <p>Special Defense: ${data.stats[4].base_stat}</p>
//               <p>Speed: ${data.stats[5].base_stat}</p>
//             </div>
//         </div>
            
//         `     
//         card.innerHTML = card_info1;
//         for(let i = 0;i < data.abilities.length;i++){
//           document.querySelector(".sids .left").innerHTML += `<p>ability: ${data.abilities[i].ability.name}</p>`;
//         }
//     })
//   }






  
// if we are on the first page
if (document.querySelector(".types")) {
  // Fetching all types
  let types = document.querySelector(".types");
  fetch(`https://pokeapi.co/api/v2/type/`)
    .then(repo => repo.json())
    .then(data => {
      data.results.forEach(type => {
        // Displaying all types in a div
        let div = document.createElement("div");
        div.className = "type";
        div.setAttribute("value", type.name);
        div.textContent = type.name;
        types.appendChild(div);
      });

      // Adding click event to each type div
      document.querySelectorAll(".type").forEach(type => {
        type.addEventListener("click", function (e) {
          const typeName = e.target.getAttribute("value");
          window.location.href = `index2.html?type=${typeName}`;
        });
      });
    });
}

// if we are on the second page (type details)
// if we are on the second page (type details)
if (document.querySelector(".type-details")) {
  const urlParams = new URLSearchParams(window.location.search);
  const typeName = urlParams.get('type');

  if (typeName) {
    fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
      .then(respo => respo.json())
      .then(data => {
        const typeDetailsDiv = document.querySelector(".type-details");
        let start = 0;
        let end = 25;
        let numOfPages = Math.ceil(data.pokemon.length / 25);

        // Create pagination buttons
        let pagesDiv = document.createElement("div");
        pagesDiv.className = "pages";
        for (let i = 1; i <= numOfPages; i++) {
          pagesDiv.innerHTML += `<div value="${i}" class="button">${i}</div>`;
        }
        typeDetailsDiv.appendChild(pagesDiv);

        // Display Pokémon for the current page
        function displayPokemons(page, searchQuery = "") {
          typeDetailsDiv.innerHTML = '';  
          typeDetailsDiv.appendChild(pagesDiv); 
          start = (page - 1) * 25;
          end = page * 25;
          const pokemonList = data.pokemon.slice(start, end);

          const filteredPokemon = pokemonList.filter(pokemon => 
            pokemon.pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          );

          filteredPokemon.forEach(pokemon => {
            const p = document.createElement("p");
            p.textContent = pokemon.pokemon.name;
            p.setAttribute("value", pokemon.pokemon.name);
            p.className = "names";
            typeDetailsDiv.appendChild(p);

            p.addEventListener("click", function (e) {
              const Name = e.target.getAttribute("value");
              window.location.href = `index3.html?name=${Name}`;
            });
          });
        }
        
        displayPokemons(1); 

        document.querySelectorAll(".pages .button").forEach(button => {
          button.addEventListener("click", function (e) {
            const pageNumber = parseInt(e.target.getAttribute("value"));
            displayPokemons(pageNumber, document.querySelector(".search").value); 
          });
        });

        document.querySelector(".search").addEventListener("input", function (e) {
          const searchQuery = e.target.value;
          displayPokemons(1, searchQuery); 
        });
      })
      .catch(error => console.error('Error fetching Pokémon data:', error));
  } else {
    console.error('Type not found in URL query.');
  }
}


// if we are on the third page (individual Pokémon details)
if (document.querySelector(".count")) {
  const urlParams = new URLSearchParams(window.location.search);
  const Name = urlParams.get('name');

  if (Name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${Name}`)
      .then(respo => respo.json())
      .then(data => {
        const card = document.querySelector(".count");
        const card_info1 = `
          <p>${data.name} (ID: ${data.id})</p>
          <img src="${data.sprites.front_default}" alt="">
          <p>Height: ${data.height}</p>
          <div class="sids">
            <div class="left">
              <p>Type: ${data.types[0].type.name}</p>
              <p>Weight: ${data.weight}</p>
              <p>Base Experience: ${data.base_experience}</p>    
            </div>
            <div class="right">
              <p>Stats:</p>
              <p>HP: ${data.stats[0].base_stat}</p>
              <p>Attack: ${data.stats[1].base_stat}</p>
              <p>Defense: ${data.stats[2].base_stat}</p>
              <p>Special Attack: ${data.stats[3].base_stat}</p>
              <p>Special Defense: ${data.stats[4].base_stat}</p>
              <p>Speed: ${data.stats[5].base_stat}</p>
            </div>
          </div>
        `;
        card.innerHTML = card_info1;

        data.abilities.forEach(ability => {
          document.querySelector(".sids .left").innerHTML += `<p>Ability: ${ability.ability.name}</p>`;
        });
      })
      .catch(error => console.error('Error fetching Pokémon details:', error));
  } else {
    console.error('Pokémon name not found in URL query.');
  }
}
