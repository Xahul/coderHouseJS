alert("Bienvenido a mi tienda virtual :)");

function persona(nombre, edad, direccion) {
    if (nombre.length < 1 || nombre.includes(" ")) return false;
    if (edad.length <1 || edad.includes(" ")) return false;
    if (direccion.length < 1 || direccion.includes(" ")) return false;
    return true;
}

function productos(codigo) {
    const productosMap = {
        1: { nombre: "procesador", precio: 600 },
        2: { nombre: "tarjeta grafica", precio: 500 },
        3: { nombre: "disipador", precio: 25 },
        4: { nombre: "teclado", precio: 20 },
        5: { nombre: "mouse", precio: 15 },
    };
    if (productosMap[codigo]) {
        console.log(`Se ha añadido el ${productosMap[codigo].nombre}`);
        return productosMap[codigo];
    } else {
        console.log("Opción no válida, por favor intentarlo de nuevo");
        return false;
    }
}

function main() {
    let obtenerNombre = prompt("Escribe tu nombre");
    let obtenerEdad = prompt("Escribe tu edad");
    let obtenerDireccion = prompt("Escribe tu dirección");
    let datosClientes = persona(obtenerNombre, obtenerEdad, obtenerDireccion);
    
    while (!datosClientes) {
        alert("Datos erróneos!");
        obtenerNombre = prompt("Escribe tu nombre");
        obtenerEdad = prompt("Escribe tu edad");
        obtenerDireccion = prompt("Escribe tu dirección");
        datosClientes = persona(obtenerNombre, obtenerEdad, obtenerDireccion);
    }

    let productosTotales = [];
    let agregarOtroProducto = true;

    while (agregarOtroProducto) {
        let obtenerCodigoProducto = parseInt(prompt("Escribe el código del producto (1-5)\n1-Procesador\n2-tarjeta grafica\n3-disipador\n4- teclado\n5 mouse"));
        let codigoCliente = productos(obtenerCodigoProducto);

        while (!codigoCliente) {
            alert("Opción inválida!");
            obtenerCodigoProducto = parseInt(prompt("Escribe el código del producto (1-5)\n1-Procesador\n2-tarjeta grafica\n3-disipador\n4- teclado\n5 mouse"));
            codigoCliente = productos(obtenerCodigoProducto);
        }

        productosTotales.push(codigoCliente);
        let agregarProducto = parseInt(prompt("¿Desea agregar otro producto?\n1- SI\n2- NO"));

        if (agregarProducto === 2) {
            agregarOtroProducto = false;
        } else if (agregarProducto !== 1) {
            alert("Opción inválida!");
        }
    }

    let productosSTR = productosTotales.map(item => `${item.nombre} ${item.precio}€`);
    console.log(productosSTR.join(", "));

    let carrito = parseInt(prompt(`Estos son los productos agregados\n${productosSTR.join(", ")}\n¿Desea eliminar algún producto?\n1- SI\n2- NO`));

    if (carrito === 1) {
        let mensaje = "¿Qué producto desea eliminar?\n";
        for (let i = 0; i < productosTotales.length; i++) {
            mensaje += `${i + 1}: ${productosTotales[i].nombre} - ${productosTotales[i].precio}€\n`;
        }
        let eliminarProducto = parseInt(prompt(mensaje));

        if (eliminarProducto > 0 && eliminarProducto <= productosTotales.length) {
            productosTotales.splice(eliminarProducto - 1, 1);
            alert("¡Producto eliminado!");
        } else {
            alert("¡Opción inválida!");
        }
    }
    console.table(productosTotales)
    const precioSubTotal = productosTotales.map(item => item.precio)
    let subtotal= (precioSubTotal.reduce((a,b)=> a + b,0));
    const IVA = 0.21;
    const totalConIVA = subtotal * (1 + IVA);
    console.log(`Subtotal: ${subtotal}`);
    console.log(`Total con IVA: ${totalConIVA}`);
    // console.log(productosTotales.map(item => item.precio))
}
main();
