

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
        console.log(data)
    })
  }

  
