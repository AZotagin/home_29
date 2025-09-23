import type { HeaderProps } from '../types';

const Header = ({ cartItemCount, onCartClick }: HeaderProps) => {
    return (
        <header className="bg-dark text-white p-3 mb-4">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="h3 mb-0">Магазин "Рик и Морти"</h1>
                    <div
                        className="position-relative"
                        style={{ cursor: 'pointer' }}
                        onClick={onCartClick}
                    >
                        <i className="bi bi-cart-fill fs-3"></i>
                        {cartItemCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartItemCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;