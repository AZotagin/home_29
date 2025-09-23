import { useState } from 'react';
import type { Product, CartItem } from './types';
import ProductCard from './components/ProductCard';
import Header from './components/Header';
import ShoppingCartModal from './components/ShoppingCartModal';
import { CurrencyProvider, useCurrency } from './contexts/CurrencyContext';
import { rickAndMortyProducts } from './data';
import './App.css';

function AppContent() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setCartOpen] = useState<boolean>(false);

    const { currentCurrency, setCurrency, currencyInfo } = useCurrency();

    const handleAddToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const handleCartClick = () => {
        setCartOpen(true);
    };

    const handleCloseCart = () => {
        setCartOpen(false);
    };

    const filteredProducts = rickAndMortyProducts.filter((product) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    });

    const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const currencies = ['shmeckles', 'credits', 'flurbos'] as const;

    return (
        <div className="container my-4">
            <Header
                cartItemCount={totalCartItems}
                onCartClick={handleCartClick}
            />

            {/* Переключатель валют */}
            <div className="mb-3">
                <label className="form-label fw-bold">Выберите валюту:</label>
                <div className="btn-group w-100" role="group">
                    {currencies.map(currency => (
                        <button
                            key={currency}
                            type="button"
                            className={`btn ${currentCurrency === currency
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                                }`}
                            onClick={() => setCurrency(currency)}
                        >
                            {currencyInfo[currency].symbol} {currencyInfo[currency].name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <input
                    type="text"
                    className={`form-control ${searchQuery && filteredProducts.length === 0 ? 'is-invalid' : ''}`}
                    placeholder="Поиск товаров по названию или описанию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && filteredProducts.length === 0 && (
                    <div className="invalid-feedback">Извините, по вашему запросу ничего не найдено.</div>
                )}
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="col">
                        <ProductCard
                            product={product}
                            onButtonClick={handleAddToCart}
                            buttonText="В корзину"
                            buttonVariant={product.inStock ? 'primary' : 'secondary'}
                        />
                    </div>
                ))}
            </div>

            {isCartOpen && (
                <ShoppingCartModal
                    items={cartItems}
                    onClose={handleCloseCart}
                />
            )}
        </div>
    );
}

function App() {
    return (
        <CurrencyProvider>
            <AppContent />
        </CurrencyProvider>
    );
}

export default App;