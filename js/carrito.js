// Obtenemos y parseamos el carrito de productos desde el almacenamiento local
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

// Seleccionamos elementos del DOM relacionados con el carrito
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Función para cargar y mostrar los productos en el carrito
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        // Si hay productos en el carrito, mostramos la lista y ocultamos otros elementos
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            // Creamos elementos HTML para cada producto en el carrito
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

            contenedorCarritoProductos.append(div);
        })

        // Actualizamos los botones de eliminar y el total
        actualizarBotonesEliminar();
        actualizarTotal();

    } else {
        // Si el carrito está vacío, mostramos el mensaje correspondiente y ocultamos otros elementos
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
}

// Función para actualizar los botones de eliminar
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;

    // Filtramos los productos para mantener solo aquellos que no coincidan con el ID del botón
    productosEnCarrito = productosEnCarrito.filter(producto => producto.id !== idBoton);

    // Actualizamos la vista del carrito y guardamos el carrito actualizado en el almacenamiento local
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Manejamos el evento de clic en el botón "Vaciar Carrito"
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    // Mostramos un mensaje de confirmación
    Swal.fire({
        title: "¿Seguro que quieres vaciar el carrito?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vaciar Carrito",
    }).then((result) => {
        if (result.isConfirmed) {
            // Vaciamos el carrito, actualizamos la vista y guardamos el carrito vacío
            productosEnCarrito = [];
            cargarProductosCarrito();
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        }
    });
}

// Función para actualizar el total de la compra en el carrito
function actualizarTotal() {
    // Calculamos el total de la compra y lo mostramos en la interfaz
    const total = productosEnCarrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    contenedorTotal.textContent = `$${total}`;
}

// Manejamos el evento de clic en el botón "Comprar"
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {
    // Vaciamos el carrito, actualizamos la vista y mostramos un mensaje de compra realizada con éxito
    productosEnCarrito = [];
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    Swal.fire({
        title: "Compra realizada con éxito",
        text: "¡Gracias por tu compra!",
        icon: "success",
    });
}

// Cargamos inicialmente los productos en el carrito
cargarProductosCarrito();
