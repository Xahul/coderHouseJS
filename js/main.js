    alert("Bienvenido a mi tienda virtual :)");

function persona(nombre,edad,direccion){
     if(nombre.length<1||nombre.includes(" "))return false;
     if(edad.length<1||edad.includes(" "))return false;   
     if(direccion.length<1||direccion.includes(" "))return false;
     return true;
}
function productos(codigo){
    const productosMap={
        codigo1: 600,
        codigo2: 500,
        codigo3: 25,
        codigo4: 20,
        codigo5: 15,
    }
    switch(codigo) {
        case 1: 
            console.log("se ha añadido el procesador");
            return productosMap.codigo1
        case 2:
            console.log("se ha añadido la tarjeta grafica");
            return productosMap.codigo2
        case 3:
            console.log("se ha añadido el disipador");
            return productosMap.codigo3
        case 4:
            console.log("se ha añadido el teclado");
            return productosMap.codigo4
        case 5:
            console.log("se ha añadido el mouse");
            return productosMap.codigo5
        default: 
            console.log("opción no valida, por favor intentarlo de nuevo")
            return false;
    }
}
function main(){
    let obtenerNombre =prompt("Escribe tu nombre");
    let obtenerEdad =prompt("Escribe tu edad");
    let obtenerDireccion =prompt("Escribe tu direccion");
    let datosClientes= persona(obtenerNombre, obtenerEdad, obtenerDireccion);
    console.log(obtenerNombre,obtenerEdad,obtenerDireccion);
    let obtenerCodigoProducto = parseInt(prompt("Escribe el codigo del producto"));
    let codigoCliente = productos(obtenerCodigoProducto);
   
    while(datosClientes===false){
        alert("Datos erroneos!");
        obtenerNombre =prompt("Escribe tu nombre");
        obtenerEdad =prompt("Escribe tu edad");
        obtenerDireccion =prompt("Escribe tu direccion");
        datosClientes= persona(obtenerNombre, obtenerEdad, obtenerDireccion);
    }
    while(codigoCliente===false){
        alert("opcion invalida!");
        obtenerCodigoProducto= parseInt(prompt("escribe el codigo del producto"));
        codigoCliente= productos(obtenerCodigoProducto); 
    }
    console.log("El precio total es:",codigoCliente+(codigoCliente*0.21));
}
main()
