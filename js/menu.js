// Seleccionamos elementos del DOM para abrir y cerrar el menú lateral
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

// Cuando hacemos clic en "Abrir Menú", mostramos el menú lateral
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

// Cuando hacemos clic en "Cerrar Menú", ocultamos el menú lateral
closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})
