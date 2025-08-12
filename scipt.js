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

    // Botón cerrar modal (X) y navegación con teclado + gestos
    const btnClose = document.createElement('button');
    btnClose.textContent = '×';
    btnClose.setAttribute('aria-label', 'Cerrar');
    btnClose.style.position = 'absolute';
    btnClose.style.top = '16px';
    btnClose.style.right = '16px';
    btnClose.style.fontSize = '2rem';
    btnClose.style.background = '#fff';
    btnClose.style.border = 'none';
    btnClose.style.borderRadius = '50%';
    btnClose.style.width = '42px';
    btnClose.style.height = '42px';
    btnClose.style.cursor = 'pointer';
    btnClose.style.boxShadow = '0 2px 8px #0003';
    btnClose.onclick = function (e) {
        e.stopPropagation();
        modal.style.visibility = 'hidden';
        modal.style.opacity = '0';
    };
    modal.appendChild(btnClose);

    document.addEventListener('keydown', function (e) {
        if (modal.style.visibility === 'visible') {
            if (e.key === 'Escape') {
                modal.style.visibility = 'hidden';
                modal.style.opacity = '0';
            } else if (e.key === 'ArrowLeft') {
                btnPrev.click();
            } else if (e.key === 'ArrowRight') {
                btnNext.click();
            }
        }
    });

    // Gestos de deslizamiento en el modal (móvil)
    let touchStartX = 0;
    modalImg.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    modalImg.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
            if (dx > 0) btnPrev.click(); else btnNext.click();
        }
    }, { passive: true });

    document.body.appendChild(modal);
    // Selecciona el contenedor donde se mostrarán los servicios
    const contenedor = document.getElementById('servicios');
    if (!contenedor) return;

    let modalFotos = [];
    let modalCurrent = 0;
    servicios.forEach(function (servicio) {
        // Crear el elemento principal
        const div = document.createElement('div');
        div.className = 'servicio';

        // Foto principal (solo la primera)
        const fotosDiv = document.createElement('div');
        fotosDiv.className = 'fotos';

        // Carrusel crossfade para las imágenes del servicio
        if (servicio.fotos && servicio.fotos.length > 0) {
            // No modificar medidas, solo el carrusel
            const imgs = servicio.fotos.map((src, idx) => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = servicio.nombre;
                img.className = 'carrusel-img';
                img.loading = 'lazy';
                img.style.opacity = idx === 0 ? '1' : '0';
                img.style.position = 'absolute';
                img.style.transition = 'opacity 1.3s cubic-bezier(.4,0,.2,1)';
                img.style.zIndex = 2;
                fotosDiv.appendChild(img);
                return img;
            });

            // Indicadores (dots)
            const dotsWrap = document.createElement('div');
            dotsWrap.className = 'dots';
            const dots = servicio.fotos.map((_, i) => {
                const d = document.createElement('span');
                d.className = 'dot' + (i === 0 ? ' active' : '');
                d.onclick = () => showImage(i);
                dotsWrap.appendChild(d);
                return d;
            });
            fotosDiv.appendChild(dotsWrap);

            let current = 0;
            let timer = null;
            function updateDots(idx) { dots.forEach((d, i) => d.classList.toggle('active', i === idx)); }
            function showImage(idx, fade = true) {
                imgs.forEach((img, i) => {
                    if (!fade) img.style.transition = 'none';
                    img.style.opacity = (i === idx) ? '1' : '0';
                    if (!fade) requestAnimationFrame(() => (img.style.transition = 'opacity 1.3s cubic-bezier(.4,0,.2,1)'));
                });
                current = idx;
                updateDots(idx);
            }
            function nextImage() { showImage((current + 1) % imgs.length); }
            function startCarousel() { if (timer) clearInterval(timer); timer = setInterval(nextImage, 6000); }
            function stopCarousel() { if (timer) { clearInterval(timer); timer = null; } }
            startCarousel();

            // Pausar en hover
            fotosDiv.addEventListener('mouseenter', stopCarousel);
            fotosDiv.addEventListener('mouseleave', () => { if (!timer) startCarousel(); });

            // Modal
            imgs.forEach((img, idx) => {
                img.style.cursor = 'pointer';
                img.onclick = function () {
                    modalCurrent = idx;
                    modalFotos = servicio.fotos;
                    modalImg.src = modalFotos[modalCurrent];
                    modal.style.visibility = 'visible';
                    modal.style.opacity = '1';
                };
            });
        }
        div.appendChild(fotosDiv);

        // Agrupar nombre y descripción en .servicio-info
        const infoDiv = document.createElement('div');
        infoDiv.className = 'servicio-info';
        const nombre = document.createElement('h2');
        nombre.textContent = servicio.nombre;
        infoDiv.appendChild(nombre);
        const desc = document.createElement('p');
        desc.textContent = servicio.descripcion;
        infoDiv.appendChild(desc);
        div.appendChild(infoDiv);

        // Precio
        const precio = document.createElement('span');
        precio.className = 'servicio-precio-badge';
        precio.textContent = 'Precio: $' + servicio.precio;
        div.appendChild(precio);

        // Agregar al contenedor
        contenedor.appendChild(div);
    });

    btnPrev.onclick = function (e) {
        e.stopPropagation();
        if (!modalFotos.length) return;
        modalCurrent = (modalCurrent - 1 + modalFotos.length) % modalFotos.length;
        modalImg.src = modalFotos[modalCurrent];
    };
    btnNext.onclick = function (e) {
        e.stopPropagation();
        if (!modalFotos.length) return;
        modalCurrent = (modalCurrent + 1) % modalFotos.length;
        modalImg.src = modalFotos[modalCurrent];
    };
});
