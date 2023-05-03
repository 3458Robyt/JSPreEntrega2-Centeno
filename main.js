// Se crea
const RECETAS = [
    {
      id: 1,
      nombre: "Espagueti a la bolognesa",
      ingredientes: ["espagueti", "carne molida", "cebolla", "ajo", "tomate"],
      tiempo: 30,
      tipo: "italiana",
    },
    {
      id: 2,
      nombre: "Tacos al pastor",
      ingredientes: ["tortillas", "carne de cerdo", "piña", "cebolla"],
      tiempo: 45,
      tipo: "mexicana",
    },
    {
      id: 3,
      nombre: "Arroz frito con pollo",
      ingredientes: ["arroz", "pollo", "zanahoria", "guisantes"],
      tiempo: 20,
      tipo: "asiática",
      },
      ];

      const recetasDiv = document.getElementById("recetas");
const form = document.querySelector("form");

function mostrarRecetas(recetas) {
recetasDiv.innerHTML = "";
if (recetas.length === 0) {
recetasDiv.innerHTML = "<p>No se encontraron recetas</p>";
return;
}
recetas.forEach((receta) => {
const recetaDiv = document.createElement("div");
recetaDiv.innerHTML = `
  <h2>${receta.nombre}</h2>
  <ul>
    <li>Ingredientes: ${receta.ingredientes.join(", ")}</li>
    <li>Tiempo de cocción: ${receta.tiempo} minutos</li>
    <li>Tipo de comida: ${receta.tipo}</li>
  </ul>
`;
recetasDiv.appendChild(recetaDiv);
});
}

const agregarRecetaBtn = document.getElementById("agregarReceta");
const modal = document.getElementById("modal");

agregarRecetaBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

const formModal = document.querySelector("#modal form");

formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const nombre = document.querySelector("#modal #nombre").value;
  const ingredientes = document.querySelector("#modal #ingredientes").value.split(",");
  const tiempo = parseInt(document.querySelector("#modal #tiempo").value);
  const tipo = document.querySelector("#modal #tipo").value;
  
  const nuevaReceta = {
    nombre,
    ingredientes,
    tiempo,
    tipo,
  };
  
  RECETAS.push(nuevaReceta);
  mostrarRecetas(RECETAS);
  modal.style.display = "none";
});


function buscarRecetas(e) {
e.preventDefault();
const busqueda = document.querySelector("input[type='text']").value.toLowerCase();
const tipo = document.querySelector("select").value;
const tiempo = parseInt(document.querySelector("input[type='number']").value);

let recetasFiltradas = RECETAS.filter((receta) => {
if (tipo !== "" && receta.tipo !== tipo) {
return false;
}
if (tiempo && receta.tiempo > tiempo) {
return false;
}
if (busqueda !== "" && !receta.nombre.toLowerCase().includes(busqueda) && !receta.ingredientes.some((ingrediente) => ingrediente.toLowerCase().includes(busqueda))) {
return false;
}
return true;
});

mostrarRecetas(recetasFiltradas);
}

form.addEventListener("submit", buscarRecetas);

mostrarRecetas(RECETAS);