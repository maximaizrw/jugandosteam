"use client";

import { useState, useEffect } from 'react';

export function useExchangeRate() {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("https://dolarapi.com/v1/dolares/cripto");
        if (!response.ok) {
          throw new Error("No se pudo obtener el valor del dólar en este momento.");
        }
        const data = await response.json();
        if (data && data.venta) {
          setExchangeRate(data.venta);
        } else {
          throw new Error("La respuesta de la API de dólar no es válida.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ocurrió un error al obtener el valor del dólar.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchExchangeRate();
  }, []);

  return { exchangeRate, isLoading, error };
}
