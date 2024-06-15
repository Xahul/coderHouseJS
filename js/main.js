import productos from "./productos.js";

console.log(productos);

const cardContainer = document.getElementById("card-container");
const toast = document.getElementById("toast");

function getCart() {
    let cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(item) {
    let cart = getCart();
    cart.push(item);
    saveCart(cart);
    showToast(`Producto "${item.title}" añadido al carrito`);
}

// Función para mostrar un toast
function showToast(message) {
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Función para filtrar productos por precio mayor o igual a un valor dado
function filterByPrice(minPrice) {
    return productos.filter(producto => parseFloat(producto.price.replace('€', '')) >= minPrice);
}

// Función para encontrar productos por coincidencia de caracteres en el título
function findByTitle(title) {
    const lowerCaseTitle = title.toLowerCase();
    return productos.filter(producto => producto.title.toLowerCase().includes(lowerCaseTitle));
}

// Función para renderizar tarjetas de productos
function renderProducts(productosToRender) {
    cardContainer.innerHTML = ''; // Limpiar contenedor
    productosToRender.forEach((item, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("w-[200px]", "rounded-lg", "h-fit", "p-4", "border");

        productCard.innerHTML = `
            <img id="imagenCarta${index}" />
            <p>${item.title}</p>
            <p>${item.desc}</p>
            <p>${item.price}</p>
            <button class="botonClick" data-index="${index}">agregar al carrito</button>
        `;
        cardContainer.appendChild(productCard);
    });

    const botones = document.querySelectorAll(".botonClick");

    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const index = boton.getAttribute("data-index");
            addToCart({
                title: productos[index].title,
                desc: productos[index].desc,
                price: productos[index].price
            });
        });
    });
}

// Inicializar la renderización con todos los productos
renderProducts(productos);

// Event listeners para las nuevas funcionalidades
document.getElementById('filter-button').addEventListener('click', () => {
    const productosFiltrados = filterByPrice(100);
    renderProducts(productosFiltrados);
});

document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('search-input').value = ''; // Limpiar campo de búsqueda
    renderProducts(productos); // Renderizar todos los productos
});

document.getElementById('search-input').addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    if (searchTerm) {
        const productosEncontrados = findByTitle(searchTerm);
        renderProducts(productosEncontrados);
    } else {
        renderProducts(productos);
    }
});


