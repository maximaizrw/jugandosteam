"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowRight, Loader2, AlertCircle, TrendingUp } from "lucide-react";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatCurrency } from "@/lib/utils";

type CalculationResult = {
  usdPrice: number;
  exchangeRates: {
    crypto: number;
    card: number;
  };
  prices: {
    transfer: number;
    card: number;
  };
  profit: {
    transfer: number;
    card: number;
  };
};

export function AdminPriceCalculator() {
  const [usdInput, setUsdInput] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  const { exchangeRates, isLoading: isLoadingRate, error: rateError } = useExchangeRate();

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    if (!usdInput) {
      setCalculationError("Por favor, ingresá un precio en dólares.");
      return;
    }
    
    const usdPrice = parseFloat(usdInput);
    if (isNaN(usdPrice) || usdPrice <= 0) {
      setCalculationError("Por favor, ingresá un precio válido.");
      return;
    }

    if (!exchangeRates) {
        setCalculationError("El valor del dólar aún no está disponible. Por favor, espera un momento.");
        return;
    }

    setIsCalculating(true);
    setCalculationError(null);

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Transfer price (based on crypto rate)
    const baseArsTransfer = usdPrice * exchangeRates.crypto;
    const finalPriceTransfer = Math.round((baseArsTransfer * 1.05) / 5) * 5;
    const profitTransfer = finalPriceTransfer - baseArsTransfer;

    // Card price (based on card rate)
    const baseArsCard = usdPrice * exchangeRates.card;
    const finalPriceCard = Math.round((baseArsCard * 1.05) / 5) * 5;
    const profitCard = finalPriceCard - baseArsCard;

    setResult({
      usdPrice: usdPrice,
      exchangeRates: exchangeRates,
      prices: { transfer: finalPriceTransfer, card: finalPriceCard },
      profit: { transfer: profitTransfer, card: profitCard },
    });

    setIsCalculating(false);
  };

  const currentError = rateError || calculationError;

  return (
    <Card className="w-full shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Calculá tu precio de venta</CardTitle>
        <CardDescription>
          Ingresá el costo en dólares del juego y calcularemos los precios de venta con tu ganancia del 5%.
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
                if (calculationError) setCalculationError(null);
            }}
            className="flex-grow text-base"
            aria-label="Precio del juego en USD"
          />
          <Button type="submit" className="w-full sm:w-auto" disabled={isCalculating || isLoadingRate}>
            {isCalculating || isLoadingRate ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="mr-2 h-4 w-4" />
            )}
            Calcular Precios
          </Button>
        </form>
         {isLoadingRate && (
            <p className="text-sm text-muted-foreground mt-2 text-center sm:text-left">Cargando cotizaciones del dólar...</p>
        )}
      </CardContent>

      {(isCalculating) && (
        <CardFooter className="flex flex-col gap-4 pt-4">
             <div className="w-full space-y-3">
                <Skeleton className="h-28 w-full" />
                <Separator/>
                <Skeleton className="h-24 w-full" />
            </div>
        </CardFooter>
      )}

      {currentError && !isCalculating && (
        <CardFooter className="pt-4">
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{currentError}</AlertDescription>
            </Alert>
        </CardFooter>
      )}

      {result && !currentError && !isCalculating && (
        <CardFooter className="flex flex-col items-start gap-6 pt-4 animate-in fade-in-50">
            <div className="w-full space-y-4">
              {/* Transfer Calculation */}
              <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center w-full mb-3">
                      <div>
                          <h3 className="font-semibold text-lg text-primary">Venta por Transferencia</h3>
                          <p className="text-sm text-muted-foreground">Basado en Dólar Cripto</p>
                      </div>
                      <div className="text-right p-2 border rounded-lg bg-secondary/50">
                          <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end"><TrendingUp size={12}/> Dólar Cripto</div>
                          <p className="font-semibold">{formatCurrency(result.exchangeRates.crypto)}</p>
                      </div>
                  </div>
                  <Separator className="my-2" />
                  <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Tu ganancia</span><span className="font-medium">+ {formatCurrency(result.profit.transfer)}</span></div>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">Precio Final de Venta</span>
                      <span className="text-2xl font-bold text-primary">{formatCurrency(result.prices.transfer)}</span>
                  </div>
              </div>

              {/* Card Calculation */}
              <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center w-full mb-3">
                      <div>
                          <h3 className="font-semibold text-lg text-accent">Venta con Tarjeta</h3>
                          <p className="text-sm text-muted-foreground">Basado en Dólar Tarjeta</p>
                      </div>
                       <div className="text-right p-2 border rounded-lg bg-secondary/50">
                          <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end"><TrendingUp size={12}/> Dólar Tarjeta</div>
                          <p className="font-semibold">{formatCurrency(result.exchangeRates.card)}</p>
                      </div>
                  </div>
                   <Separator className="my-2" />
                  <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Tu ganancia</span><span className="font-medium">+ {formatCurrency(result.profit.card)}</span></div>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">Precio Final de Venta</span>
                      <span className="text-2xl font-bold text-accent">{formatCurrency(result.prices.card)}</span>
                  </div>
              </div>
            </div>
        </CardFooter>
      )}
    </Card>
  );
}
