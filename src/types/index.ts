export interface Product {
    id: number;
    name: string;
    description: string;
    prices: {
        shmeckles: number;
        credits: number;
        flurbos: number;
    };
    imageUrl: string;
    inStock: boolean;
}

export interface ProductCardProps {
    product: Product;
    onButtonClick: (product: Product) => void;
    buttonText: string;
    buttonVariant: 'primary' | 'secondary';
}

export interface CartItem extends Product {
    quantity: number;
}

export interface HeaderProps {
    cartItemCount: number;
    onCartClick?: () => void;
}

export interface ShoppingCartModalProps {
    items: CartItem[];
    onClose: () => void;
}

// Новые типы для системы валют
export type Currency = 'shmeckles' | 'credits' | 'flurbos';

export interface CurrencyInfo {
    symbol: string;
    name: string;
}

export interface CurrencyContextType {
    currentCurrency: Currency;
    setCurrency: (currency: Currency) => void;
    currencyInfo: Record<Currency, CurrencyInfo>;
}