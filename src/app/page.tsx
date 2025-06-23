import { PriceCalculator } from '@/components/price-calculator';
import { Gamepad2 } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
            <div className="inline-flex flex-col items-center gap-3 mb-4">
                <Gamepad2 className="h-16 w-16 text-primary" />
                <h1 className="text-5xl font-bold font-headline tracking-tighter text-foreground">
                    JUGANDOSTEAM
                </h1>
                <div className="w-32 h-1 bg-primary rounded-full" />
            </div>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Calculá cuánto te va a costar ese juego de Steam en pesos argentinos, con todos los impuestos incluidos.
          </p>
        </header>

        <PriceCalculator />

        <footer className="mt-12 text-center text-sm text-muted-foreground">
           <p>
            Los precios son estimaciones y pueden variar. La cotización del dólar y los impuestos pueden cambiar.
          </p>
          <p className="mb-4">Hecho con ❤️ para la comunidad gamer.</p>
        </footer>
      </div>
    </main>
  );
}
