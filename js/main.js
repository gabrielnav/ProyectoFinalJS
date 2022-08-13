console.log('Fetch a JSON local');

const URL = 'js/Productos.json'
function mostrarDetalles(productos) {

    const contenedorDeProducto = document.getElementById("contenedor-de-Producto");
    contenedorDeProducto.innerHTML = "";
    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("Producto");
        divProducto.innerHTML = `
    <img src="${
            producto.imagen
        }"  alt="${
            producto.titulo
        }">
    <h3>${
            producto.titulo
        }</h3>
    <p>Diseñador: ${
            producto.diseñador
        }</p>
    <p>Precio: ${
            producto.price
        }</p>
    <a href="${
            producto.link
        }">Ver video</a>`;

 
        // ==========

        // ==========
        const botonVerDetalle = document.createElement("button");
        botonVerDetalle.innerText = "Ver Detalle";
        botonVerDetalle.addEventListener("click", () => {
            mostrarDetalles(producto);
            crearBotonVolver();
        })
        divProducto.appendChild(botonVerDetalle);
        // ==========
        contenedorDeProducto.appendChild(divProducto);
    })
    function mostrarDetalles(producto) {

        const contenedorDeProducto = document.getElementById("contenedor-de-Producto");

        contenedorDeProducto.innerHTML = "";

        contenedorDeProducto.innerHTML = `
          <img src="${
            producto.imagen
        }" alt="${
            producto.titulo
        }" >
          <h3>${
            producto.titulo
        }</h3>
          <p>Diseñador: ${
            producto.diseñador
        }</p>
          <p>${
            producto.descripcion
        }</p>
          <a href="${
            producto.link
        }">Ver video</a>`;
    }
    
    class Prenda {
        constructor(titulo, cantidad, diseñador) {
            this.titulo = titulo;
            this.cantidad = cantidad;           
            this.diseñador = diseñador;

        }
    }

    let nombreUsuario;

    document.getElementById("formulario-usuario").addEventListener("submit", manejadorFormularioUsuario);

    function manejadorFormularioUsuario(e) {
        e.preventDefault();
        nombreUsuario = document.getElementById("user").value;
        let listadodePrendas = document.getElementById("listadodePrendas");
        const prendas = JSON.parse(localStorage.getItem(nombreUsuario));

        if (prendas == null) {
            listadodePrendas.innerHTML = "<h1>No hay prendas agregadas al carrito</h1>"
        } else {
            mostrarPrendas(prendas);
        } mostrarPanel();
    }

    function mostrarPrendas(prendas) {
        let listadodePrendas = document.getElementById("listadodePrendas");
        listadodePrendas.innerHTML = "";
        prendas.forEach(prenda => {
            let li = document.createElement("li");
            li.innerHTML = `
        <hr> ${
                prenda.titulo.toUpperCase()
            } - ${
                prenda.cantidad
           
            }unidades   - ${
                prenda.diseñador
            } `;
            const botonBorrar = document.createElement("button");
            botonBorrar.innerText = "Borrar";
            botonBorrar.addEventListener("click", () => {
                Swal.fire({
                    title: 'Está seguro de eliminar el producto?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, seguro',
                    cancelButtonText: 'No, no quiero'
                }).then((result) => {

                    if (result.isConfirmed) {
                        eliminarPrenda(prenda);
                        Swal.fire({title: 'Borrado!', icon: 'success', text: 'El archivo ha sido borrado'})
                    }
                })
            })
            li.appendChild(botonBorrar);
            listadodePrendas.appendChild(li);
        });
    }


    function mostrarPanel() {
        const opciones = document.getElementById("opciones");

        opciones.innerHTML = `<h3 >Bienvenido ${nombreUsuario}</h3>
        <form id="formulario-prenda">
          <input type="text" id="titulo" placeholder="Titulo">
          <input type="number" id="cantidad" placeholder="Cantidad">
          <input type="text" id="diseñador" placeholder="Diseñador">
          <button type="submit">Agregar prenda al carrito</button>
        </form>`;

        document.getElementById("formulario-prenda").addEventListener("submit", agregarPrenda);
    }

    function agregarPrenda(e) {
        e.preventDefault();
        const titulo = document.getElementById("titulo").value;
        const cantidad = document.getElementById("cantidad").value;
        const diseñador = document.getElementById("diseñador").value;

        const prenda = new Prenda(titulo, cantidad, diseñador);

        const prendasEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));

        if (prendasEnLocalStorage == null) {
            localStorage.setItem(nombreUsuario, JSON.stringify([prenda]));
            mostrarPrendas([prenda]);
        } else {
            prendasEnLocalStorage.push(prenda);
            localStorage.setItem(nombreUsuario, JSON.stringify(prendasEnLocalStorage));
            mostrarPrendas(prendasEnLocalStorage);
        } e.target.reset();
    }

    function eliminarPrenda(prenda) {
        console.log(prenda);
        const prendasEnLocalStorage = JSON.parse(localStorage.getItem(nombreUsuario));
        const nuevoArray = prendasEnLocalStorage.filter(item => item.titulo != prenda.titulo);
        localStorage.setItem(nombreUsuario, JSON.stringify(nuevoArray));
        mostrarPrendas(nuevoArray);
    }
}


fetch(URL).then(res => res.json()).then(data => {
    mostrarDetalles(data)
}).catch(err => {
    console.log('Hubo un error: ');
}). finally(() => {
    console.log('Terminó el fetch')
})


