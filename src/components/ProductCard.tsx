import { useCurrency } from '../contexts/CurrencyContext';
import type { ProductCardProps } from '../types';

const ProductCard = ({ product, onButtonClick, buttonText, buttonVariant }: ProductCardProps) => {
    const { currentCurrency, currencyInfo } = useCurrency();

    const price = product.prices[currentCurrency];
    const currencySymbol = currencyInfo[currentCurrency].symbol;

    return (
        <div className="card h-100">
            <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text flex-grow-1">{product.description}</p>
                <p className="card-text fw-bold">
                    Цена: {price.toFixed(2)} {currencySymbol}
                </p>

                <button
                    className={`btn btn-${buttonVariant}`}
                    onClick={() => onButtonClick(product)}
                    disabled={!product.inStock}
                >
                    {buttonText}
                </button>

                {!product.inStock && (
                    <small className="text-danger mt-2">Нет в наличии</small>
                )}
            </div>
        </div>
    );
};

export default ProductCard;