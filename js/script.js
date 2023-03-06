// ARRAY PRODUCTOS DESDE JSON

/* const productos = [
    {
        id: "Lechuga",
        titulo: "Lechuga x KG",
        imagen: "./img/verduras/01.jpg",
        categoria: {
            nombre: "Verduras",
            id: "verduras"
        },
        precio: 860
    },
    {
        id: "Pimiento Amarillo",
        titulo: "Pimiento A. x KG",
        "imagen": "./img/verduras/02.jpg",
        "categoria": {
            nombre: "Verduras",
            id: "verduras"
        },
        precio: 620
    },
    {
        id: "Pimiento Rojo",
        titulo: "Pimiento R. x KG",
        "imagen": "./img/verduras/03.jpg",
        "categoria": {
            nombre: "Verduras",
            id: "verduras"
        },
        precio: 870
    },
    {
        id: "Cebolla",
        titulo: "Cebolla x KG",
        "imagen": "./img/verduras/04.jpg",
        "categoria": {
            nombre: "Verduras",
            id: "verduras"
        },
        precio: 450
    },
    {
        id: "Zapallito",
        titulo: "Zapallito x KG",
        "imagen": "./img/verduras/05.jpg",
        "categoria": {
            nombre: "Verduras",
            id: "verduras"
        },
        precio: 380
    },
    {
        id: "Uva",
        titulo: "Uva x KG",
        "imagen": "./img/frutas/01.jpg",
        "categoria": {
            nombre: "Frutas",
            id: "frutas"
        },
        precio: 590
    },
    {
        id: "Naranja",
        titulo: "Naranja x KG",
        "imagen": "./img/frutas/02.jpg",
        "categoria": {
            nombre: "Frutas",
            id: "frutas"
        },
        precio: 360
    },
    {
        id: "Manzana",
        titulo: "Manzana x KG",
        "imagen": "./img/frutas/03.jpg",
        "categoria": {
            nombre: "Frutas",
            id: "frutas"
        },
        precio: 570
    },
    {
        id: "Banana",
        titulo: "Banana x KG",
        "imagen": "./img/frutas/04.jpg",
        "categoria": {
            nombre: "Frutas",
            id: "frutas"
        },
        precio: 290
    },
    {
        id: "Kiwi",
        titulo: "Kiwi x KG",
        "imagen": "./img/frutas/05.jpg",
        "categoria": {
            nombre: "Frutas",
            id: "frutas"
        },
        precio: 1500
    },
    {
        id: "Nueces",
        titulo: "Nuez x KG",
        "imagen": "./img/frutos secos/01.jpg",
        "categoria": {
            nombre: "Frutos Secos",
            id: "frutosSecos"
        },
        precio: 3500
    },
    {
        id: "Pasas",
        titulo: "Pasas Negras x 250g",
        "imagen": "./img/frutos secos/02.jpg",
        "categoria": {
            nombre: "Frutos Secos",
            id: "frutosSecos"
        },
        precio: 250
    },
    {
        id: "Almendra",
        titulo: "Almendras x 500g",
        "imagen": "./img/frutos secos/03.jpg",
        "categoria": {
            nombre: "Frutos Secos",
            id: "frutosSecos"
        },
        precio: 1800
    },
    {
        id: "castañas de caju",
        titulo: "Castañas x 150g",
        "imagen": "./img/frutos secos/04.jpg",
        "categoria": {
            nombre: "Frutos Secos",
            id: "frutosSecos"
        },
        precio: 1000
    },
    {
        id: "mani",
        titulo: "Mani pelado x KG",
        "imagen": "./img/frutos secos/05.jpg",
        "categoria": {
            nombre: "Frutos Secos",
            id: "frutosSecos"
        },
        precio: 420
    }
]; */

// Variables 

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

let productos = [];

fetch("js/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            cargarProductos(productos);
        })


/*FUNCIONES*/

// Función que crea todos los elementos del html

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles"> 
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

// Función para elegir categoría de productos
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));

        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

// Función para actualizar carrito
function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}


//Guardar en localStorage los productos 

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

//Función para agregar al carrito el elemento

function agregarAlCarrito(e){

    Toastify({
        text: "Se agregó producto",
        duration: 2000,
        close: false,
        gravity: "top", 
        position: "right",
        stopOnFocus: true,
        style: {
        background: "linear-gradient(90deg, rgba(20,90,32,1) 0%, rgba(0,173,30,1) 100%)",
        borderRadius: "1.2rem",
        opacity: "80%"
        },
        offset: {
            x: 20,
            y: 20
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Actualizar número de ícono carrito

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
