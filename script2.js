// Global variables for pagination and search
let currentPage = 1;
let limit = 20;  // Default number of Pokémon per page
let offset = 0; // Starting offset for fetching Pokémon
let totalPokemon = 1000; // Total number of Pokémon (can be fetched dynamically)
let totalPages = Math.ceil(totalPokemon / limit); // Total pages based on Pokémon count

let allPokemon = [];  // Store all Pokémon data
let filteredPokemon = [];  // Filtered list based on search

// Fetch Pokémon data from the API
async function fetchPokemon() {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    allPokemon = data.results;  // Store all Pokémon data
    filterPokemon();  // Apply search filter
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
}

// Filter Pokémon based on search input
function filterPokemon() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  
  // Filter Pokémon by name
  filteredPokemon = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  displayPokemon(filteredPokemon); // Display filtered Pokémon
  updatePaginationButtons(); // Update pagination
}

// Display Pokémon in the container
function displayPokemon(pokemonList) {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = ""; // Clear previous Pokémon data

  pokemonList.forEach(pokemon => {
    const pokemonElement = document.createElement("div");
    pokemonElement.textContent = pokemon.name;
    container.appendChild(pokemonElement);
  });
}

// Generate pagination buttons (with ellipses when needed)
function generatePaginationButtons() {
  const pageButtonsContainer = document.getElementById("page-buttons");
  pageButtonsContainer.innerHTML = ""; // Clear previous buttons

  const startPage = Math.max(currentPage - 2, 1); // Start page is 2 before current page
  const endPage = Math.min(currentPage + 2, totalPages); // End page is 2 after current page
  
  // Always show the first page
  if (startPage > 1) {
    const firstPageButton = document.createElement("button");
    firstPageButton.textContent = "1";
    firstPageButton.addEventListener("click", () => goToPage(1));
    pageButtonsContainer.appendChild(firstPageButton);

    const ellipsis = document.createElement("span");
    ellipsis.textContent = "...";
    pageButtonsContainer.appendChild(ellipsis);
  }

  // Show page numbers around the current page
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => goToPage(i));
    if (i === currentPage) {
      pageButton.classList.add("active"); // Highlight the current page button
    }
    pageButtonsContainer.appendChild(pageButton);
  }

  // Always show the last page
  if (endPage < totalPages) {
    const ellipsis = document.createElement("span");
    ellipsis.textContent = "...";
    pageButtonsContainer.appendChild(ellipsis);

    const lastPageButton = document.createElement("button");
    lastPageButton.textContent = totalPages;
    lastPageButton.addEventListener("click", () => goToPage(totalPages));
    pageButtonsContainer.appendChild(lastPageButton);
  }
}

// Handle "Previous" button click
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    offset = (currentPage - 1) * limit;
    updatePage();
  }
}

// Handle "Next" button click
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    offset = (currentPage - 1) * limit;
    updatePage();
  }
}

// Go to a specific page
function goToPage(page) {
  currentPage = page;
  offset = (page - 1) * limit;
  updatePage();
}

// Update page content (Pokémon list and pagination)
function updatePage() {
  fetchPokemon();
  generatePaginationButtons();
}

// Update the state of "Previous" and "Next" buttons
function updatePaginationButtons() {
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  // Disable Previous button on the first page
  prevButton.disabled = currentPage === 1;

  // Disable Next button on the last page
  nextButton.disabled = currentPage === totalPages;
}

// Initialize the page and add event listeners
function initialize() {
  fetchPokemon();
  generatePaginationButtons();

  // Event listener for the dropdown to change the number of Pokémon per page
  document.getElementById("limit-select").addEventListener("change", (e) => {
    limit = parseInt(e.target.value);
    totalPages = Math.ceil(totalPokemon / limit);
    currentPage = 1;  // Reset to first page
    offset = 0;  // Reset offset
    fetchPokemon(); // Fetch Pokémon with the new limit
    generatePaginationButtons(); // Regenerate pagination buttons
  });

  // Event listener for the search bar
  document.getElementById("search-bar").addEventListener("input", filterPokemon);
}

// Initialize the page on load
initialize();

// Event listeners for Pagination buttons
document.getElementById("prev-button").addEventListener("click", prevPage);
document.getElementById("next-button").addEventListener("click", nextPage);

