// Initialize Swiper
const initSwiper = () => {
    const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
                pagination: true
            },
            998: {
                slidesPerView: 3,
                spaceBetween: 30,
                pagination: false,
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 40,
                pagination: false
            }
        },
        direction: 'horizontal',
        loop: true,
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
};

// Initialize Masonry
const initMasonry = () => {
    const elem = document.querySelector('.grid');
    
    const msnry = new Masonry(elem, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-item',
        gutter: 20,
        isFitWidth: true
    });
    imagesLoaded(elem, function() {
        msnry.layout();
    });
   
};

// Handle links and cards in the About section
const initLinksCards = () => {
    const links = document.querySelectorAll('.page-link');
    const cards = document.querySelectorAll('.about__service-card');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('data-bs-target');

            cards.forEach(card => {
                card.style.display = (card.id === targetId) ? 'block' : 'none';
            });
        });
    });
};

// Handle offcanvas for the navbar
const initOffcanvasNavbar = () => {
    const offcanvas = document.getElementById('offcanvasNavbar2');
    const searchIcon = document.querySelector('.navbar__actions-item--search');
    const searchText = document.querySelector('.nav-item--search');
    const cartIcon = document.querySelector('.navbar__actions-item--cart');
    const cartText = document.querySelector('.nav-item--cart');

    offcanvas.addEventListener('show.bs.offcanvas', function() {
        searchIcon.classList.add('d-none');
        searchText.classList.remove('d-none');
        cartIcon.classList.add('d-none');
        cartText.classList.remove('d-none');
    });

    offcanvas.addEventListener('hide.bs.offcanvas', function() {
        searchIcon.classList.remove('d-none');
        searchText.classList.add('d-none');
        cartIcon.classList.remove('d-none');
        cartText.classList.add('d-none');
    });
};

async function loadProducts() {
    
    try {
        const response = await fetch(`../../data/products.json`);
        const products = await response.json();
        const productsGrid = document.getElementById('products-grid');
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('grid-item', 'products-grid-item');

            productCard.innerHTML = `
                <div class="product-card">
                    <a href="${product.image}" data-lightbox="image-${product.id}">
                        <img src="${product.image}" class="product-card__image" alt="${product.name}">
                    </a>
                    <div class="card-content">
                        <p class="product-card__title">${product.name}</p>
                        <p class="product-card__price">${product.price}</p>
                        <p class="product-card__description">${product.description}</p>
                        <button type="button" class="btn product-card__button w-100 px-4 py-1 my-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add to cart
                        </button>
                    </div>
                </div>
            `;

            productsGrid.appendChild(productCard);
            
        });
        initMasonry();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    initSwiper();   
    initLinksCards();
    initOffcanvasNavbar();
    loadProducts();
});