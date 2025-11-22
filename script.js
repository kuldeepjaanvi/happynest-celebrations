// Global state
let catalogueData = null;
let currentCategory = 'all';
let searchQuery = '';

// DOM Elements
const loadingSpinner = document.getElementById('loadingSpinner');
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const categoryTabs = document.querySelectorAll('.category-tab');
const cakesGrid = document.getElementById('cakesGrid');
const decorationsGrid = document.getElementById('decorationsGrid');
const giftsGrid = document.getElementById('giftsGrid');
const noResults = document.getElementById('noResults');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCatalogue();
    setupEventListeners();
});

// Load catalogue data from JSON
async function loadCatalogue() {
    try {
        const response = await fetch('data/catalogue.json');
        if (!response.ok) {
            throw new Error('Failed to load catalogue data');
        }
        catalogueData = await response.json();
        renderProducts();
        hideLoading();
    } catch (error) {
        console.error('Error loading catalogue:', error);
        showError('Failed to load products. Please refresh the page.');
        hideLoading();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
    });

    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            currentCategory = tab.dataset.category;
            updateActiveTab();
            renderProducts();
            // Scroll to top of products section
            document.getElementById('productsContainer').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Update active tab styling
function updateActiveTab() {
    categoryTabs.forEach(tab => {
        if (tab.dataset.category === currentCategory) {
            tab.classList.add('active', 'text-gray-700', 'border-b-2', 'border-pink-500');
            tab.classList.remove('text-gray-500');
        } else {
            tab.classList.remove('active', 'text-gray-700', 'border-b-2', 'border-pink-500');
            tab.classList.add('text-gray-500');
        }
    });
}

// Render products based on current filter
function renderProducts() {
    if (!catalogueData) return;

    // Clear existing products
    cakesGrid.innerHTML = '';
    decorationsGrid.innerHTML = '';
    giftsGrid.innerHTML = '';
    noResults.classList.add('hidden');

    let hasResults = false;

    // Filter and render cakes
    if (currentCategory === 'all' || currentCategory === 'cakes') {
        const filteredCakes = filterProducts(catalogueData.cakes || []);
        if (filteredCakes.length > 0) {
            filteredCakes.forEach(cake => {
                cakesGrid.appendChild(createProductCard(cake, 'cakes'));
            });
            hasResults = true;
        }
    }

    // Filter and render decorations
    if (currentCategory === 'all' || currentCategory === 'decorations') {
        const filteredDecorations = filterProducts(catalogueData.decorations || []);
        if (filteredDecorations.length > 0) {
            filteredDecorations.forEach(decor => {
                decorationsGrid.appendChild(createProductCard(decor, 'decorations'));
            });
            hasResults = true;
        }
    }

    // Filter and render gifts
    if (currentCategory === 'all' || currentCategory === 'gifts') {
        const filteredGifts = filterProducts(catalogueData.gifts || []);
        if (filteredGifts.length > 0) {
            filteredGifts.forEach(gift => {
                giftsGrid.appendChild(createProductCard(gift, 'gifts'));
            });
            hasResults = true;
        }
    }

    // Show/hide sections based on category
    document.getElementById('cakes').style.display = 
        (currentCategory === 'all' || currentCategory === 'cakes') && 
        filterProducts(catalogueData.cakes || []).length > 0 ? 'block' : 'none';
    
    document.getElementById('decorations').style.display = 
        (currentCategory === 'all' || currentCategory === 'decorations') && 
        filterProducts(catalogueData.decorations || []).length > 0 ? 'block' : 'none';
    
    document.getElementById('gifts').style.display = 
        (currentCategory === 'all' || currentCategory === 'gifts') && 
        filterProducts(catalogueData.gifts || []).length > 0 ? 'block' : 'none';

    // Show no results message if no products match
    if (!hasResults) {
        noResults.classList.remove('hidden');
    }
}

// Filter products based on search query
function filterProducts(products) {
    if (!searchQuery) return products;
    
    return products.filter(product => {
        const title = product.title?.toLowerCase() || '';
        const description = product.description?.toLowerCase() || '';
        return title.includes(searchQuery) || description.includes(searchQuery);
    });
}

// Create product card element
function createProductCard(product, category) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden card-hover fade-in';
    
    // Image with lazy loading
    const imageContainer = document.createElement('div');
    imageContainer.className = 'relative h-64 bg-gray-200 overflow-hidden';
    
    // Create placeholder data URI (simple gray placeholder)
    const placeholderDataUri = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'600\'%3E%3Crect fill=\'%23e5e7eb\' width=\'800\' height=\'600\'/%3E%3Ctext fill=\'%239ca3af\' font-family=\'sans-serif\' font-size=\'24\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EImage Coming Soon%3C/text%3E%3C/svg%3E';
    
    const img = document.createElement('img');
    img.src = product.image || placeholderDataUri;
    img.alt = product.title || 'Product image';
    img.className = 'w-full h-full object-cover';
    img.loading = 'lazy';
    
    // Error handling for images
    img.onerror = function() {
        this.src = placeholderDataUri;
    };
    
    imageContainer.appendChild(img);
    
    // Card content
    const cardContent = document.createElement('div');
    cardContent.className = 'p-5';
    
    const title = document.createElement('h3');
    title.className = 'text-xl font-bold text-gray-800 mb-2';
    title.textContent = product.title || 'Untitled Product';
    
    const description = document.createElement('p');
    description.className = 'text-gray-600 mb-4 text-sm';
    description.textContent = product.description || 'No description available';
    
    const price = document.createElement('p');
    price.className = 'text-2xl font-bold text-pink-500 mb-4';
    price.textContent = product.price || 'Price on request';
    
    // CTA Buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex gap-2';
    
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/919742349239?text=Hi! I'm interested in ${encodeURIComponent(product.title || 'this product')}`;
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold text-center transition text-sm flex items-center justify-center gap-2';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> <span class="hidden sm:inline">Inquire</span>';
    
    const callBtn = document.createElement('a');
    callBtn.href = 'tel:+919742349239';
    callBtn.className = 'flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg font-semibold text-center transition text-sm flex items-center justify-center gap-2';
    callBtn.innerHTML = '<i class="fas fa-phone"></i> <span class="hidden sm:inline">Call</span>';
    
    buttonContainer.appendChild(whatsappBtn);
    buttonContainer.appendChild(callBtn);
    
    cardContent.appendChild(title);
    cardContent.appendChild(description);
    cardContent.appendChild(price);
    cardContent.appendChild(buttonContainer);
    
    card.appendChild(imageContainer);
    card.appendChild(cardContent);
    
    return card;
}

// Hide loading spinner
function hideLoading() {
    loadingSpinner.classList.add('hidden');
    productsContainer.classList.remove('hidden');
}

// Show error message
function showError(message) {
    productsContainer.innerHTML = `
        <div class="text-center py-20">
            <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-4"></i>
            <p class="text-xl text-gray-600">${message}</p>
        </div>
    `;
    productsContainer.classList.remove('hidden');
}

