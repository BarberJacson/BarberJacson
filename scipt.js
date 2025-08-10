// Importar el array de servicios
// Si usas un archivo HTML, asegúrate de incluir primero llenar.js y luego scipt.js

// Aquí empieza la lógica para mostrar los servicios en la página
window.addEventListener('DOMContentLoaded', function () {
    // Crear modal para mostrar imágenes ampliadas
    const modal = document.createElement('div');
    modal.id = 'modal-imagen';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.85)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';
    modal.style.flexDirection = 'column';
    modal.style.transition = 'opacity 0.2s';
    modal.style.display = 'flex';
    modal.style.visibility = 'hidden';

    // Imagen grande
    const modalImg = document.createElement('img');
    modalImg.style.maxWidth = '90vw';
    modalImg.style.maxHeight = '80vh';
    modalImg.style.borderRadius = '18px';
    modalImg.style.boxShadow = '0 8px 32px #000a';
    modalImg.style.marginBottom = '18px';
    modal.appendChild(modalImg);

    // Botones para navegar
    const btnPrev = document.createElement('button');
    btnPrev.textContent = '<';
    btnPrev.style.margin = '0 18px 0 0';
    btnPrev.style.fontSize = '2rem';
    btnPrev.style.background = '#fff';
    btnPrev.style.border = 'none';
    btnPrev.style.borderRadius = '50%';
    btnPrev.style.width = '48px';
    btnPrev.style.height = '48px';
    btnPrev.style.cursor = 'pointer';
    btnPrev.style.boxShadow = '0 2px 8px #0003';

    const btnNext = document.createElement('button');
    btnNext.textContent = '>';
    btnNext.style.margin = '0 0 0 18px';
    btnNext.style.fontSize = '2rem';
    btnNext.style.background = '#fff';
    btnNext.style.border = 'none';
    btnNext.style.borderRadius = '50%';
    btnNext.style.width = '48px';
    btnNext.style.height = '48px';
    btnNext.style.cursor = 'pointer';
    btnNext.style.boxShadow = '0 2px 8px #0003';

    const navDiv = document.createElement('div');
    navDiv.style.display = 'flex';
    navDiv.style.justifyContent = 'center';
    navDiv.appendChild(btnPrev);
    navDiv.appendChild(btnNext);
    modal.appendChild(navDiv);

    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
        }
    });

    document.body.appendChild(modal);
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

        // Foto principal (solo la primera)
        const fotosDiv = document.createElement('div');
        fotosDiv.className = 'fotos';
        const img = document.createElement('img');
        img.src = servicio.fotos[0];
        img.alt = servicio.nombre;
        fotosDiv.appendChild(img);

        // Modal para ver más imágenes SOLO de este servicio
        let fotoActual = 0;
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            fotoActual = 0;
            modalImg.src = servicio.fotos[fotoActual];
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            // Guardar imágenes actuales para navegación
            modalImg.dataset.fotos = JSON.stringify(servicio.fotos);
        });

        btnPrev.onclick = function (e) {
            e.stopPropagation();
            const fotos = JSON.parse(modalImg.dataset.fotos || '[]');
            fotoActual = (fotoActual - 1 + fotos.length) % fotos.length;
            modalImg.src = fotos[fotoActual];
        };
        btnNext.onclick = function (e) {
            e.stopPropagation();
            const fotos = JSON.parse(modalImg.dataset.fotos || '[]');
            fotoActual = (fotoActual + 1) % fotos.length;
            modalImg.src = fotos[fotoActual];
        };

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
