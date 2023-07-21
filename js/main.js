// Clase para representar un combo de hamburguesa
class ComboHamburguesa {
    constructor(nombre, precio, ingredientes) {
      this.nombre = nombre;
      this.precio = precio;
      this.ingredientes = ingredientes;
    }
  }
  
  // Clase para representar un producto adicional
  class Producto {
    constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
    }
  }
  
  // Combos de hamburguesas disponibles
  const combosHamburguesa = {
    1: new ComboHamburguesa("CheeseBurger", 1200, ["Carne", "Cheddar", "Ketchup", "Cebolla"]),
    2: new ComboHamburguesa("AmericanBurger", 1500, ["Carne", "Cheddar", "Panceta ahumada", "Cebolla crispy"]),
    3: new ComboHamburguesa("BigBurger", 1700, ["Carne", "Queso", "Lechuga", "Tomate"])
  };
  
  // Productos adicionales
  const productos = [
    new Producto("Hamburguesa Simple", 0),
    new Producto("Hamburguesa Doble", 500),
    new Producto("Papas", 300)
  ];
  
  // Función para mostrar los ingredientes del combo de hamburguesa
  function mostrarIngredientes(comboHamburguesa) {
    console.log(`Ingredientes del ${comboHamburguesa.nombre}:`);
    comboHamburguesa.ingredientes.forEach(ingrediente => {
      console.log("- " + ingrediente);
    });
  }
  
  // Función para obtener una selección válida de combo de hamburguesa
  function obtenerComboHamburguesa() {
    let comboHamburguesaSeleccionado;
  
    do {
      comboHamburguesaSeleccionado = parseInt(prompt("Ingrese el número del combo de hamburguesa que desea (1, 2 o 3)"));
      if (!isValidComboHamburguesa(comboHamburguesaSeleccionado)) {
        alert("Opción no válida. Por favor, ingrese un número válido (1, 2 o 3).");
      }
    } while (!isValidComboHamburguesa(comboHamburguesaSeleccionado));
  
    return combosHamburguesa[comboHamburguesaSeleccionado];
  }
  
  // Función para validar el combo de hamburguesa seleccionado
  function isValidComboHamburguesa(comboHamburguesa) {
    return Number.isInteger(comboHamburguesa) && comboHamburguesa >= 1 && comboHamburguesa <= 3;
  }
  
  // Función para obtener si el usuario desea hamburguesa doble
  function obtenerHamburguesaDoble() {
    let respuesta;
  
    do {
      respuesta = prompt("¿Desea que su hamburguesa sea doble? (si/no)").toLowerCase();
    } while (respuesta !== "si" && respuesta !== "no");
  
    return respuesta === "si";
  }
  
  // Función para obtener si el usuario desea ordenar papas
  function obtenerOrdenPapas() {
    let respuesta;
  
    do {
      respuesta = prompt("¿Desea ordenar papas? (si/no)").toLowerCase();
    } while (respuesta !== "si" && respuesta !== "no");
  
    return respuesta === "si";
  }
  
  // Función para calcular el total a pagar por un combo de hamburguesa
  function calcularTotalAPagar(comboHamburguesa, hamburguesaDoble, ordenarPapas) {
    let totalAPagar = comboHamburguesa.precio;
  
    if (hamburguesaDoble) {
      let hamburguesaDoblePrecio = productos.find(producto => producto.nombre === "Hamburguesa Doble").precio;
      totalAPagar += hamburguesaDoblePrecio;
    }
  
    if (ordenarPapas) {
      let papasPrecio = productos.find(producto => producto.nombre === "Papas").precio;
      totalAPagar += papasPrecio;
    }
  
    return totalAPagar;
  }
  
  // Función para mostrar el resultado al usuario
  function mostrarResultado(totalAPagar) {
    alert("El total a pagar es de " + totalAPagar);
    console.log("El total a pagar es de " + totalAPagar)
  }
  
  // Función para mostrar el pedido final al usuario
  function mostrarPedido(pedido) {
    console.log("-----------");
    console.log("Su pedido:");
    pedido.forEach((item, index) => {
      console.log(`Combo ${index + 1}: ${item.combo.nombre}`);
      if (item.hamburguesaDoble) {
        console.log("Hamburguesa doble");
      }
      if (item.ordenarPapas) {
        console.log("Papas");
      }
      console.log(`Total a pagar: ${item.total}`);
      console.log("-----------");
    });
  }
  
  // Función para iniciar el simulador
  function iniciarSimulador() {
    const pedido = [];
  
    while (true) {
      const comboHamburguesaSeleccionado = obtenerComboHamburguesa();
      const hamburguesaDoble = obtenerHamburguesaDoble();
      const ordenarPapas = obtenerOrdenPapas();
      const totalAPagar = calcularTotalAPagar(comboHamburguesaSeleccionado, hamburguesaDoble, ordenarPapas);
  
      pedido.push({
        combo: comboHamburguesaSeleccionado,
        hamburguesaDoble: hamburguesaDoble,
        ordenarPapas: ordenarPapas,
        total: totalAPagar
      });
  
      mostrarIngredientes(comboHamburguesaSeleccionado);
  
      let deseaContinuar;
      do {
        deseaContinuar = prompt("¿Desea continuar con la compra? (si/no)").toLowerCase();
      } while (deseaContinuar !== "si" && deseaContinuar !== "no");
  
      if (deseaContinuar !== "si") {
        mostrarResultado(pedido.reduce((total, item) => total + item.total, 0));
        mostrarPedido(pedido);
        break;
      }
    }
  }
  
  // Iniciar el simulador
  iniciarSimulador();