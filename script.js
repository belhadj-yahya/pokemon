

//if we are in the first page
if (document.querySelector(".types")) {
//fetching all types
    let types = document.querySelector(".types");
    fetch(`https://pokeapi.co/api/v2/type/`)
      .then(repo => {
        return repo.json();
      })
      .then(data => {
        for (let i = 0; i < data.results.length; i++) {
        //displaying all types in a div
          let div = document.createElement("div");
          div.className = "type";
          div.setAttribute("value", data.results[i].name);
          div.textContent = data.results[i].name;
          types.appendChild(div);
        }
        document.querySelectorAll(".type").forEach(type => {
          type.addEventListener("click", function(e) {
            const typeName = e.target.getAttribute("value");
            window.location.href = `index2.html?type=${typeName}`;
          });
        });
      });
  }
  
  //if we are in the second page
  if (document.querySelector(".type-details")) {
    const urlParams = new URLSearchParams(window.location.search);
    const typeName = urlParams.get('type');
    if (typeName) {
      fetch(`https://pokeapi.co/api/v2/type/${typeName}`)
        .then(respo => respo.json())
        .then(data => {
          const typeDetailsDiv = document.querySelector(".type-details");
          if (data.pokemon.length > 0) {
            data.pokemon.forEach(pokemon => {
              const p = document.createElement("p");
              p.textContent = pokemon.pokemon.name;
              p.setAttribute("value",pokemon.pokemon.name)
              p.className = "names"
              document.querySelectorAll(".names").forEach(name =>{
                name.addEventListener("click", function(e) {
                    const Name = e.target.getAttribute("value");
                    window.location.href = `index3.html?name=${Name}`;
                  });
              })
              typeDetailsDiv.appendChild(p);
            });
          } else {
            typeDetailsDiv.textContent = `No Pokémon found for ${typeName}.`;
          }
        })
        .catch(error => console.error('Error fetching Pokémon data:', error));
    } else {
      console.error('Type not found in URL query.');
    }
  }

 // if we are in the thred page
  if (document.querySelector(".count")){
    const urlParams = new URLSearchParams(window.location.search);
    const Name = urlParams.get('name');
    console.log(Name)
    fetch(`https://pokeapi.co/api/v2/pokemon/${Name}`)
    .then(respo => {
        return respo.json()
    })
    .then(data => {
      let card = document.querySelector(".count")
        console.log(data)
        let card_info1 = `
         <p>${data.name} id${data.id}</p>
         <img src="${data.sprites.front_default}" alt="">
         <p>Height: ${data.height}</p>
         <div class="sids">
            <div class="left">
            <p>Weight: ${data.weight}</p>
         <p>Base Experience: ${data.base_experience}</p>
         <p>Types: ${data.abilities[0].ability.name}</p>
         <p>Types: ${data.abilities[1].ability.name}</p>
         <p>Types: ${data.abilities[2].ability.name}</p>     
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
            
        `     
              card.innerHTML = card_info1;
              



    })
  }

  
