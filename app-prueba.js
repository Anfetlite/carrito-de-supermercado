const contenedor = document.getElementById("contenido");
const botonInsertar = document.getElementById("buttonInsertar");
const detalleItem = document.getElementById("nombreItem");
const precioItem = document.getElementById("precioItem");
const cantidadItems = document.getElementById("cantidadItems");
const totalGeneral = document.getElementById("totalGeneral");
const formato = (n) => n.toLocaleString("es-CO");
let contador = 1;
let totalGlobal = 0;

[detalleItem, precioItem, cantidadItems].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("error");
  });
});

botonInsertar.addEventListener("click", () => {
  const precio = parseInt(precioItem.value.replace(/\D/g, ""), 10);
  const cantidad = parseInt(cantidadItems.value, 10);

  // if (
  //   detalleItem.value.trim() === "" ||
  //   isNaN(precio) ||
  //   isNaN(cantidad) ||
  //   cantidad <= 0
  // ) {
  //   alert("Por favor ingresa datos validos");
  //   return;
  // }

  //Limpiar errores previos
  detalleItem.classList.remove("error");
  precioItem.classList.remove("error");
  cantidadItems.classList.remove("error");

  //Validadmos item no vacio
  let validarCampos = false;

  if (detalleItem.value.trim() === "") {
    detalleItem.classList.add("error");
    validarCampos = true;
  }

  if (isNaN(precio)) {
    precioItem.classList.add("error");
    validarCampos = true;
  }

  if (isNaN(cantidad) || cantidad <= 0) {
    cantidadItems.classList.add("error");
    validarCampos = true;
  }

  if (validarCampos) return;

  //Formatear texto

  const detalleFormateado = detalleItem.value.trim();
  const detalleItemFinal =
    detalleFormateado.charAt(0).toUpperCase() +
    detalleFormateado.slice(1).toLowerCase();

  let totalPrecioItem = precio * cantidad;
  totalGlobal += totalPrecioItem;
  totalGeneral.textContent = `Total: ${formato(totalGlobal)}`;

  //Insertar Contenedor principal (newDivFila)
  const newDivFila = document.createElement("div");
  newDivFila.classList.add("fila");

  const newItem = document.createElement("div");
  newItem.textContent = `${detalleItemFinal} Precio ${formato(precio)} x  ${cantidad} Unidad(es) = Total ${formato(totalPrecioItem)}`;

  //Validar par-impar
  if (contador % 2 === 0) {
    newItem.classList.add("elemento-par");
  } else {
    newItem.classList.add("elemento-impar");
  }

  //eliminar
  const contenedorBoton = document.createElement("div");
  const botonBorrar = document.createElement("button");
  botonBorrar.textContent = "❌";
  botonBorrar.classList.add("botonBorrar");

  botonBorrar.addEventListener("click", () => {
    totalGlobal -= totalPrecioItem;
    totalGeneral.textContent = `Total: ${formato(totalGlobal)}`;
    newDivFila.remove();
  });

  contenedorBoton.append(botonBorrar);
  newDivFila.append(newItem, contenedorBoton);
  contenedor.append(newDivFila);

  contador++;
  detalleItem.value = "";
  precioItem.value = "";
  cantidadItems.value = "";
  detalleItem.focus();
});
