import React, { useEffect } from 'react';
import { create } from 'zustand';

interface CurrencyState {
  usd: string;
  eur: string;
  setUsd: (value: string) => void;
  setEur: (value: string) => void;
}

const useCurrencyStore = create<CurrencyState>((set: (arg0: { (): { usd: string; eur: string; }; (): { eur: string; usd: string; }; }) => any) => ({
  usd: '',
  eur: '',
  setUsd: (value: string) => set(() => {
    const eur = value === '' ? '' : (parseFloat(value) / 1.07).toFixed(2);
    return { usd: value, eur };
  }),
  setEur: (value: string) => set(() => {
    const usd = value === '' ? '' : (parseFloat(value) * 1.07).toFixed(2);
    return { eur: value, usd };
  }),
}));

export const CurrencyConverter: React.FC = () => {
  const { usd, eur, setUsd, setEur } = useCurrencyStore();

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('currency-container');
      if (container) {
        if (window.innerWidth < 600) {
          container.style.flexDirection = 'column';
        } else {
          container.style.flexDirection = 'row';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleUsdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setUsd(value);
    }
  };

  const handleEurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setEur(value);
    }
  };

  return (
    <div id="currency-container" style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="usd">USD</label>
        <input
          id="usd"
          type="text"
          value={usd}
          onChange={handleUsdChange}
          placeholder="Enter USD"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="eur">EUR</label>
        <input
          id="eur"
          type="text"
          value={eur}
          onChange={handleEurChange}
          placeholder="Enter EUR"
        />
      </div>
    </div>
  );
};
