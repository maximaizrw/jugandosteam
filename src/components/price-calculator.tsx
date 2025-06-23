"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";


type CalculationResult = {
  usdPrice: number;
  exchangeRate: number;
  prices: {
    baseArs: number;
    finalArs: number;
  };
};

const formatCurrency = (value: number, currency = "ARS") => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
};

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.459L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.096l.335 1.019-1.125 4.092 4.195-1.102.978.361z"/></svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.012 7.053.072 2.695.272.273 2.69.073 7.052.013 8.333 0 8.74 0 12s.013 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.072c4.362-.2 6.78-2.618 6.98-6.98C23.988 15.667 24 15.26 24 12s-.012-3.667-.072-4.947c-.2-4.362-2.618-6.78-6.98-6.98C15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
);

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

    setResult({
      usdPrice: usdPrice,
      exchangeRate: exchangeRate,
      prices: { baseArs, finalArs },
    });

    setIsLoading(false);
  };

  return (
    <TooltipProvider>
    <Card className="w-full shadow-lg overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Calculá el precio final</CardTitle>
        <CardDescription>
          Ingresá el precio en dólares de un juego para saber el precio final que pagarías por transferencia.
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
        <CardFooter className="flex flex-col items-stretch gap-4 pt-4 animate-in fade-in-50">
            <div className="bg-primary/90 w-full p-6 rounded-lg flex flex-col justify-center items-center text-center">
                <span className="text-lg font-semibold text-primary-foreground">Precio Final a Pagar</span>
                <span className="text-4xl font-bold text-primary-foreground mt-1">{formatCurrency(result.prices.finalArs)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center w-full px-4">Este es el precio final que pagarias con transferencia</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-2" size="lg">
                  Comprar con transferencia
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Contactate para comprar</DialogTitle>
                  <DialogDescription>
                    Elegí tu método de contacto preferido para coordinar la compra.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                    <Link href="https://wa.me/5492804014435" target="_blank" rel="noopener noreferrer">
                      <WhatsappIcon className="mr-2 h-6 w-6" />
                      Contactar por WhatsApp
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white">
                     <Link href="https://www.instagram.com/JUGANDOSTEAM" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon className="mr-2 h-6 w-6" />
                        Enviar mensaje por Instagram
                    </Link>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
        </CardFooter>
      )}
    </Card>
    </TooltipProvider>
  );
}
