const agregadoCarrito = localStorage.getItem("cart"); 
const carritoCompra = document.getElementById("carritoCompra");
const localItems = JSON.parse(agregadoCarrito);
const buyBtn = document.createElement("button");

localItems.forEach(item => {
    const newText = document.createElement("div");
    newText.classList.add("w-full", "px-4", "mt-4");
    newText.innerHTML =` 
    <p class="border p-4 rounded-md hover:bg-gray-300 transition-colors duration-150 ease-in-out">
        Title: ${item.title}, Descripción: ${item.desc}, Precio: ${item.price}
    </p>
    `;
    carritoCompra.appendChild(newText);
});

buyBtn.classList.add("px-12", "py-2", "border", "mt-4", "bg-blue-400", "rounded-md", "text-white", "font-semibold", "text-2xl");
buyBtn.innerHTML = "Comprar";
buyBtn.addEventListener("click", () => {
    // Guardar la información de compra en localStorage y redirigir a checkout.html
    localStorage.setItem("purchaseInfo", JSON.stringify(localItems));
    window.location.href = "checkout.html";
});
carritoCompra.appendChild(buyBtn);

console.log(localItems);
