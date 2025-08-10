// Importar el array de servicios
// Si usas un archivo HTML, asegúrate de incluir primero llenar.js y luego scipt.js

// Aquí empieza la lógica para mostrar los servicios en la página
window.addEventListener('DOMContentLoaded', function () {
    // Selecciona el contenedor donde se mostrarán los servicios
    const contenedor = document.getElementById('servicios');
    if (!contenedor) return;

    servicios.forEach(function (servicio) {
        // Crear el elemento principal
        const div = document.createElement('div');
        div.className = 'servicio';

        // Nombre
        const nombre = document.createElement('h2');
        nombre.textContent = servicio.nombre;
        div.appendChild(nombre);

        // Fotos
        const fotosDiv = document.createElement('div');
        fotosDiv.className = 'fotos';
        servicio.fotos.forEach(function (foto) {
            const img = document.createElement('img');
            img.src = foto;
            img.alt = servicio.nombre;
            img.style.width = '100px';
            img.style.marginRight = '5px';
            fotosDiv.appendChild(img);
        });
        div.appendChild(fotosDiv);

        // Descripción
        const desc = document.createElement('p');
        desc.textContent = servicio.descripcion;
        div.appendChild(desc);

        // Precio
        const precio = document.createElement('p');
        precio.textContent = 'Precio: $' + servicio.precio;
        div.appendChild(precio);

        // Agregar al contenedor
        contenedor.appendChild(div);
    });
});
