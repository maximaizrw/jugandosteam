"use client";

import { useState, useEffect } from 'react';

type ExchangeRates = {
  crypto: number;
  card: number;
};

export function useExchangeRate() {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [cryptoResponse, cardResponse] = await Promise.all([
          fetch("https://dolarapi.com/v1/dolares/cripto"),
          fetch("https://dolarapi.com/v1/dolares/tarjeta"),
        ]);

        if (!cryptoResponse.ok || !cardResponse.ok) {
          throw new Error("No se pudo obtener el valor del dólar en este momento.");
        }

        const cryptoData = await cryptoResponse.json();
        const cardData = await cardResponse.json();

        if (cryptoData && cryptoData.venta && cardData && cardData.venta) {
          setExchangeRates({
            crypto: cryptoData.venta,
            card: cardData.venta,
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

  return { exchangeRates, isLoading, error };
}
