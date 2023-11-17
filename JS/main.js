const servicios = [

    {
        id: "001",
        titulo: "Sesión S",
        imagen: "./img/1.jpg",
        categoria: {
            nombre: "Fotos",
            id: "fotos"
        },
        precio: 50
    },
    {
        id: "002",
        titulo: "Sesión M",
        imagen: "./img/2.jpg",
        categoria: {
            nombre: "Fotos",
            id: "fotos"
        },
        precio: 100
    },
    {
        id: "003",
        titulo: "Sesión L",
        imagen: "./img/3.jpg",
        categoria: {
            nombre: "Fotos",
            id: "fotos"
        },
        precio: 150
    },
    {
        id: "004",
        titulo: "Sesión XL",
        imagen: "./img/4.jpg",
        categoria: {
            nombre: "Fotos",
            id: "fotos"
        },
        precio: 200
    },
    {
        id: "005",
        titulo: "Concierto",
        imagen: "./img/5.jpg",
        categoria: {
            nombre: "Videos",
            id: "videos"
        },
        precio: 50
    },
    {
        id: "006",
        titulo: "Spot",
        imagen: "./img/6.jpg",
        categoria: {
            nombre: "Videos",
            id: "videos"
        },
        precio: 1000
    },
    {
        id: "007",
        titulo: "Reel",
        imagen: "./img/7.jpg",
        categoria: {
            nombre: "Videos",
            id: "videos"
        },
        precio: 500
    },
    {
        id: "008",
        titulo: "Videobook",
        imagen: "./img/8.jpg",
        categoria: {
            nombre: "videos",
            id: "videos"
        },
        precio: 200
    }
]

const contenedorServicios = document.querySelector("#contenedor-servicios");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
const number = document.querySelector("#number");

botonesCategorias.forEach((boton) =>
    boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})
);

function cargarServicios(serviciosElegidos) {
    contenedorServicios.innerHTML = "";

serviciosElegidos.forEach((servicio) => {
    const div = document.createElement("div");
    div.classList.add("servicio");
    div.innerHTML = `
        <img class="servicio-imagen" src="${servicio.imagen}" alt="${servicio.titulo}">
        <div class="servicio-detalles">
            <h3 class="servicio-titulo">${servicio.titulo}</h3>
            <p class="servicio-precio">$${servicio.precio}</p>
            <button class="servicio-agregar" id="${servicio.id}">Agregar</button>
        </div>
    `;

    contenedorServicios.append(div);
});

actualizarBotonesAgregar();
}

botonesCategorias.forEach((boton) => {
    boton.addEventListener("click", (e) => {
    botonesCategorias.forEach((boton) => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
        const serviciosBoton = servicios.filter(
        (servicio) => servicio.categoria.id === e.currentTarget.id
);
    tituloPrincipal.innerText = serviciosBoton[0].categoria.nombre;
    cargarServicios(serviciosBoton);
    } else {
        tituloPrincipal.innerText = "Todos los servicios";
        cargarServicios(servicios);
    }
});
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".servicio-agregar");

    botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarAlCarrito);
});
}

let serviciosEnCarrito = localStorage.getItem("servicios-en-carrito");

if (serviciosEnCarrito) {
    serviciosEnCarrito = JSON.parse(serviciosEnCarrito);
    actualizarNumber();
} else {
    serviciosEnCarrito = [];
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const servicioAgregado = servicios.find((servicio) => servicio.id === idBoton);

    if (serviciosEnCarrito.some((servicio) => servicio.id === idBoton)) {
    const index = serviciosEnCarrito.findIndex((servicio) => servicio.id === idBoton);
    serviciosEnCarrito[index].cantidad++;
    } else {
    servicioAgregado.cantidad = 1;
    serviciosEnCarrito.push(servicioAgregado); // Cambié 'servicios' a 'servicioAgregado'
}
    actualizarNumber();
    localStorage.setItem("servicios-en-carrito", JSON.stringify(serviciosEnCarrito));
}

function actualizarNumber() {
    let nuevoNumber = serviciosEnCarrito.reduce((acc, servicio) => acc + servicio.cantidad, 0);
    number.innerText = nuevoNumber;
}

cargarServicios(servicios);
