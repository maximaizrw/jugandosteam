"use client";

import { useState, useEffect, useCallback } from 'react';

type ExchangeRates = {
  crypto: number;
  card: number;
<<<<<<< HEAD
  custom: number;
=======
  eneba: number;
>>>>>>> 97ee1a8e5d4cf3a95c27efd1a214f3c85431ab86
};

const CUSTOM_RATE_STORAGE_KEY = 'custom_dollar_rate';

export function useExchangeRate() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch exchange rates from API
        const [cryptoResponse, cardResponse] = await Promise.all([
          fetch("https://dolarapi.com/v1/dolares/cripto"),
          fetch("https://dolarapi.com/v1/dolares/tarjeta"),
        ]);

        if (!cryptoResponse.ok || !cardResponse.ok) {
          throw new Error("No se pudo obtener el valor del dólar en este momento.");
        }

        const cryptoData = await cryptoResponse.json();
        const cardData = await cardResponse.json();

        // Get custom rate from localStorage
        const savedCustomRate = localStorage.getItem(CUSTOM_RATE_STORAGE_KEY);
        const customRate = savedCustomRate ? parseFloat(savedCustomRate) : 1500; // Default custom value

        if (cryptoData && cryptoData.venta && cardData && cardData.venta) {
          setExchangeRates({
            crypto: cryptoData.venta,
            card: cardData.venta,
<<<<<<< HEAD
            custom: customRate,
=======
            eneba: 1480,
>>>>>>> 97ee1a8e5d4cf3a95c27efd1a214f3c85431ab86
          });
        } else {
          throw new Error("La respuesta de la API de dólar no es válida.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error al obtener el valor del dólar.");
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  const setCustomRate = useCallback((rate: number) => {
    try {
      localStorage.setItem(CUSTOM_RATE_STORAGE_KEY, rate.toString());
      setExchangeRates(prevRates => {
        if (!prevRates) return null;
        return { ...prevRates, custom: rate };
      });
    } catch (error) {
      console.error("Failed to save custom rate:", error);
    }
  }, []);

  return { exchangeRates, isLoading, error, setCustomRate };
}
