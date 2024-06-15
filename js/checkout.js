document.addEventListener("DOMContentLoaded", () => {
    const facturaSection = document.getElementById("factura");
    const purchaseInfo = JSON.parse(localStorage.getItem("purchaseInfo"));

    if (purchaseInfo && purchaseInfo.length > 0) {
        purchaseInfo.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("w-full", "px-4", "mt-4");
            itemDiv.innerHTML = `
                <p class="border p-4 rounded-md">
                    Title: ${item.title}, Descripción: ${item.desc}, Precio: ${item.price}
                </p>
            `;
            facturaSection.appendChild(itemDiv);
        });

        // Calcular el total de la compra
        const total = purchaseInfo.reduce((acc, item) => acc + parseFloat(item.price.replace('€', '')), 0);
        const totalDiv = document.createElement("div");
        totalDiv.classList.add("w-full", "px-4", "mt-4", "font-bold", "text-xl");
        totalDiv.innerHTML = `Total: ${total.toFixed(2)*(1+0.21)} €`;
        facturaSection.appendChild(totalDiv);
    } else {
        const emptyMessage = document.createElement("p");
        emptyMessage.classList.add("w-full", "px-4", "mt-4");
        emptyMessage.innerText = "No se encontraron artículos en su compra.";
        facturaSection.appendChild(emptyMessage);
    }
});
