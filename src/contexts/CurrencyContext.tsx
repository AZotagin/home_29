import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Currency, CurrencyContextType } from '../types';

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
    children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    const [currentCurrency, setCurrentCurrency] = useState<Currency>('shmeckles');

    const currencyInfo: Record<Currency, CurrencyInfo> = {
        shmeckles: { symbol: '₴', name: 'Шмекели' },
        credits: { symbol: '©', name: 'Кредиты' },
        flurbos: { symbol: 'ƒ', name: 'Флурбо' }
    };

    const value: CurrencyContextType = {
        currentCurrency,
        setCurrency: setCurrentCurrency,
        currencyInfo
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext);
    if (context === undefined) {
        throw new Error('useCurrency must be used within a CurrencyProvider');
    }
    return context;
};