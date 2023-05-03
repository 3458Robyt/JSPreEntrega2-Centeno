// Creamos un array de objetos que representan cada receta
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
  
  // Obtenemos el elemento HTML donde se mostrarán las recetas
  const recetasDiv = document.getElementById("recetas");
  // Obtenemos el formulario de búsqueda
  const form = document.querySelector("form");
  
  // Función que muestra las recetas en el HTML
  function mostrarRecetas(recetas) {
    recetasDiv.innerHTML = ""; // Vaciamos el contenido anterior
    if (recetas.length === 0) {
      // Si no se encontraron recetas, se muestra un mensaje
      recetasDiv.innerHTML = "<p>No se encontraron recetas</p>";
      return;
    }
    recetas.forEach((receta) => {
      // Creamos un div por cada receta y lo agregamos al HTML
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
  
  // Obtenemos el botón para agregar recetas y el modal que se muestra al hacer click
  const agregarRecetaBtn = document.getElementById("agregarReceta");
  const modal = document.getElementById("modal");
  
  // Agregamos un event listener al botón para mostrar el modal al hacer click
  agregarRecetaBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });
  
  // Obtenemos el formulario del modal
  const formModal = document.querySelector("#modal form");
  
  // Agregamos un event listener al formulario del modal para agregar la nueva receta
  formModal.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Obtenemos los valores ingresados por el usuario en el modal
    const nombre = document.querySelector("#modal #nombre").value;
    const ingredientes = document.querySelector("#modal #ingredientes").value.split(",");
    const tiempo = parseInt(document.querySelector("#modal #tiempo").value);
    const tipo = document.querySelector("#modal #tipo").value;
    
    // Creamos un objeto que representa la nueva receta
    const nuevaReceta = {
      nombre,
      ingredientes,
      tiempo,
      tipo,
    };
    
    // Agregamos la nueva receta al array de recetas y actualizamos la vista
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