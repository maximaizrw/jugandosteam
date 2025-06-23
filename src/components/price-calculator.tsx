"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, Loader2, AlertCircle, TrendingUp } from "lucide-react";

type CalculationResult = {
  usdPrice: number;
  exchangeRate: number;
  prices: {
    baseArs: number;
    finalArs: number;
  };
  profit: number;
};

const formatCurrency = (value: number, currency = "ARS") => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
};

export function PriceCalculator() {
  const [usdInput, setUsdInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
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
      }
    };

    fetchExchangeRate();
  }, []);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usdInput) {
      setError("Por favor, ingresá un precio en dólares.");
      return;
    }
    
    const usdPrice = parseFloat(usdInput);
    if (isNaN(usdPrice) || usdPrice <= 0) {
      setError("Por favor, ingresá un precio válido.");
      return;
    }

    if (!exchangeRate) {
        setError("El valor del dólar aún no está disponible. Por favor, espera un momento.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const baseArs = usdPrice * exchangeRate;
    const finalPriceBeforeRounding = baseArs * 1.10;
    const finalArs = Math.round(finalPriceBeforeRounding / 5) * 5;
    const profit = finalArs - baseArs;

    setResult({
      usdPrice: usdPrice,
      exchangeRate: exchangeRate,
      prices: { baseArs, finalArs },
      profit: profit,
    });

    setIsLoading(false);
  };

  return (
    <Card className="w-full shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Calculá tu precio de venta</CardTitle>
        <CardDescription>
          Ingresá el precio en dólares del juego y te mostramos el precio final de venta con tu ganancia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCalculate} className="flex flex-col sm:flex-row items-center gap-3">
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="14.99"
            value={usdInput}
            onChange={(e) => {
                setUsdInput(e.target.value);
                if (error) setError(null);
            }}
            className="flex-grow text-base"
            aria-label="Precio del juego en USD"
          />
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading || !exchangeRate}>
            {isLoading || !exchangeRate ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}
            Calcular Precio
          </Button>
        </form>
         {!exchangeRate && !error && (
            <p className="text-sm text-muted-foreground mt-2 text-center sm:text-left">Cargando cotización del dólar...</p>
        )}
      </CardContent>

      {isLoading && (
        <CardFooter className="flex flex-col gap-4 pt-4">
             <div className="w-full space-y-3">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-12 w-28 rounded-lg" />
                </div>
                <Separator/>
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Separator/>
                <Skeleton className="h-12 w-full mt-1" />
            </div>
        </CardFooter>
      )}

      {error && (
        <CardFooter className="pt-4">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </CardFooter>
      )}

      {result && (
        <CardFooter className="flex flex-col items-start gap-4 pt-4 animate-in fade-in-50">
             <div className="flex justify-between items-center w-full">
                 <div className="flex-1">
                    <h3 className="text-muted-foreground text-sm">Precio Ingresado (USD)</h3>
                    <p className="text-xl font-semibold text-foreground">{formatCurrency(result.usdPrice, "USD")}</p>
                </div>
                <div className="text-right p-2 border rounded-lg bg-secondary/50">
                    <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end"><TrendingUp size={12}/> Dólar Cripto</div>
                    <p className="font-semibold">{formatCurrency(result.exchangeRate)}</p>
                </div>
            </div>

            <Separator className="my-2" />

            <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Precio base (costo)</span>
                    <span className="font-medium text-foreground">{formatCurrency(result.prices.baseArs)}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tu ganancia</span>
                    <span className="font-medium text-foreground">
                        + {formatCurrency(result.profit)}
                    </span>
                </div>
            </div>

            <Separator className="my-2" />

            <div className="bg-accent/50 w-full p-4 rounded-lg flex justify-between items-center">
                <span className="text-xl font-bold text-accent-foreground">Precio Final de Venta</span>
                <span className="text-2xl font-bold text-accent-foreground">{formatCurrency(result.prices.finalArs)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center w-full">Este es el precio final al que deberías vender el juego.</p>

        </CardFooter>
      )}
    </Card>
  );
}
