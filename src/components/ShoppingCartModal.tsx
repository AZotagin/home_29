import { useCurrency } from '../contexts/CurrencyContext';
import type { ShoppingCartModalProps } from '../types';

const ShoppingCartModal = ({ items, onClose }: ShoppingCartModalProps) => {
    const { currentCurrency, currencyInfo } = useCurrency();

    const totalAmount = items.reduce((sum, item) => sum + (item.prices[currentCurrency] * item.quantity), 0);
    const currencySymbol = currencyInfo[currentCurrency].symbol;

    return (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Корзина покупок</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {items.length === 0 ? (
                            <p className="text-center">Корзина пуста</p>
                        ) : (
                            <>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Товар</th>
                                                <th>Цена ({currencySymbol})</th>
                                                <th>Количество</th>
                                                <th>Сумма ({currencySymbol})</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={item.imageUrl}
                                                                alt={item.name}
                                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                                className="me-2"
                                                            />
                                                            <div>
                                                                <h6 className="mb-0">{item.name}</h6>
                                                                <small className="text-muted">{item.description.slice(0, 50)}...</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item.prices[currentCurrency].toFixed(2)}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{(item.prices[currentCurrency] * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <h5>Итого: {totalAmount.toFixed(2)} {currencySymbol}</h5>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Закрыть
                        </button>
                        {items.length > 0 && (
                            <button type="button" className="btn btn-primary">
                                Оформить заказ
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartModal;