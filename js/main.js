const url = 'https://real-time-amazon-data.p.rapidapi.com/search?query=Phone&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '946d9a3c18msh1be5463692c5e44p1db593jsnc582cd355c5e',
    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
  }
};

let productos = [];

fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    productos = data.data.products;
    console.log(productos);
    renderProducts(productos);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

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
  showToast(`Producto "${item.product_title}" añadido al carrito`);
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
function filterByPrice(minPrice, productos) {
  return productos.filter(producto => parseFloat(producto.product_price.replace('$', '')) >= minPrice);
}

// Función para encontrar productos por coincidencia de caracteres en el título
function findByTitle(title, productos) {
  const lowerCaseTitle = title.toLowerCase();
  return productos.filter(producto => producto.product_title.toLowerCase().includes(lowerCaseTitle));
}

// Función para renderizar tarjetas de productos
function renderProducts(productosToRender) {
  cardContainer.innerHTML = ''; // Limpiar contenedor
  productosToRender.forEach((item, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("w-[200px]", "rounded-lg", "h-fit", "p-4", "border");

    productCard.innerHTML = `
      <img id="imagenCarta${index}" src="${item.product_photo}" alt="${item.product_title}" />
      <p>${item.product_title}</p>
      <p>${item.delivery}</p>
      <p>${item.product_price}</p>
      <button class="botonClick" data-index="${index}">agregar al carrito</button>
    `;
    cardContainer.appendChild(productCard);
  });

  const botones = document.querySelectorAll(".botonClick");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const index = boton.getAttribute("data-index");
      addToCart({
        product_title: productosToRender[index].product_title,
        delivery: productosToRender[index].delivery,
        product_price: productosToRender[index].product_price,
        product_photo: productosToRender[index].product_photo
      });
    });
  });
}

// Event listeners para las nuevas funcionalidades
document.getElementById('filter-button').addEventListener('click', () => {
  const minPrice = parseFloat(document.getElementById('filter-price').value);
  const productosFiltrados = filterByPrice(minPrice, productos);
  renderProducts(productosFiltrados);
});

document.getElementById('reset-button').addEventListener('click', () => {
  document.getElementById('search-input').value = ''; // Limpiar campo de búsqueda
  renderProducts(productos); // Renderizar todos los productos
});

document.getElementById('search-input').addEventListener('input', (event) => {
  const searchTerm = event.target.value;
  if (searchTerm) {
    const productosEncontrados = findByTitle(searchTerm, productos);
    renderProducts(productosEncontrados);
  } else {
    renderProducts(productos);
  }
});


