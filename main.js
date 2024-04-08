let nation = document.getElementById('nazione');
let lista = document.getElementById("lista");

nation.addEventListener("change", async () => {
  lista.innerHTML = ""; // Rimuovi tutti gli elementi figli della lista

  if (nation.value === "") {
    alert("Inserisci la nazione");
  } else {
    console.clear();
    await fetchProducts();
  }
});

async function fetchProducts() {
  try {
    const response = await fetch("Citta.json");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    Cerca(data.citta);
  } catch (error) {
    console.error(`Could not fetch data: ${error}`);
  }
}

function Cerca(citta) {
  const luoghi = [];

  citta.forEach(element => {
    if (element.nome === nation.value) {
      element.Luoghi.forEach(luogo => {
        console.log(luogo.Nome);
        luoghi.push(luogo);
      });
    }
  });

  luoghi.forEach(luogo => {
    const elementoLi = document.createElement("li");
    
    // Crea il bottone con il simbolo "+"
    const expandButton = document.createElement("button");
    expandButton.className = "expand-button";
    expandButton.innerHTML = "+";

    // Crea l'elemento di descrizione inizialmente nascosto
    const descrizioneDiv = document.createElement("div");
    descrizioneDiv.className = "descrizione";
    descrizioneDiv.textContent = luogo.Descrizione;

    // Aggiungi il gestore di eventi al pulsante per mostrare/nascondere la descrizione
    expandButton.addEventListener("click", () => {
      if (descrizioneDiv.style.display === "none") {
        elementoLi.style.color="green";

        descrizioneDiv.style.display = "block"; // Mostra la descrizione
        descrizioneDiv.style.margin = "6px";
      } else {
        descrizioneDiv.style.display = "none"; // Nascondi la descrizione
        elementoLi.style.color="black";
      }
    });

  
    elementoLi.appendChild(expandButton);
    elementoLi.appendChild(document.createTextNode(luogo.Nome));
    elementoLi.appendChild(descrizioneDiv);

    lista.appendChild(elementoLi);
  });
}

