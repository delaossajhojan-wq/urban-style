const productos = [
    { id: 1, nombre: "Camiseta oversized", precio: 20000, img: "Oversized.jpg" },
    { id: 2, nombre: "Pantalón", precio: 67000, img: "pantalon beige.jpg" },
    { id: 3, nombre: "Chaqueta de cuero", precio: 80000, img: "chaqueta hombre.jpg" },
    { id: 4, nombre: "Camiseta", precio: 28000, img: "CamisetasBasic.jpg(1).jpg" },
    { id: 5, nombre: "Jean blue", precio: 55000, img: "jeanblue.jpg" },
    { id: 6, nombre: "Chaqueta", precio: 67000, img: "chaqueta marron.jpg" },
    { id: 7, nombre: "Camiseta negra", precio: 20000, img: "negra.jpg" },
    { id: 8, nombre: "Pantalón drill", precio: 46000, img: "Pantalon drll.jpg" },
    { id: 9, nombre: "Chaqueta de jean", precio: 38000, img: "chaqueta de jean.jpg" }
];

let carrito = [];

const contenedor = document.getElementById("lista-productos");
const inputBusqueda = document.getElementById("input-busqueda");

// Mostrar productos
function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    lista.forEach(p => {
        contenedor.innerHTML += `
            <div class="producto">
                <img src="${p.img}">
                <h3>${p.nombre}</h3>
                <p>$${p.precio}</p>
                <button onclick="agregarCarrito(${p.id})">Comprar</button>
            </div>
        `;
    });
}

// Carrito
function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("items-carrito");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador");

    lista.innerHTML = "";
    let suma = 0;

    carrito.forEach(p => {
        lista.innerHTML += `<li>${p.nombre} - $${p.precio}</li>`;
        suma += p.precio;
    });

    total.textContent = suma;
    contador.textContent = carrito.length;
}

// Mostrar productos al inicio
mostrarProductos(productos);

// Buscador
inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.toLowerCase();

    const filtrados = productos.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(filtrados);
});

// Mostrar carrito
document.getElementById("carrito-btn").addEventListener("click", () => {
    document.getElementById("carrito").classList.toggle("oculto");
});

let pedidos = [];

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Pago
function realizarPago() {
    if (carrito.length === 0) {
        alert("El carrito está vacío ❌");
        return;
    }

    pedidos.push([...carrito]);
    mostrarPedidos();

    alert("Pago realizado con éxito 💳");

    carrito = [];
    actualizarCarrito();
}

// Mostrar pedidos
function mostrarPedidos() {
    const lista = document.getElementById("lista-pedidos");
    lista.innerHTML = "";

    pedidos.forEach((pedido, i) => {
        lista.innerHTML += `<li>Pedido ${i + 1} - ${pedido.length} productos</li>`;
    });
}