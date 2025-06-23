import { PriceCalculator } from '@/components/price-calculator';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-background p-4 sm:p-8 md:p-12">
      <div className="w-full max-w-2xl">
        <header className="mb-8 text-center">
            <div className="inline-flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/20 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M10.24 3.16A3.99 3.99 0 0 0 9.22 2.5a4 4 0 0 0-3.64 2.24 4 4 0 0 0-2.24 3.64 4 4 0 0 0 2.5 3.76l.24.12V13.5a4 4 0 0 0 2.24 3.64 4 4 0 0 0 3.64 2.24 4 4 0 0 0 3.76-2.5l.12-.24h1.38a4 4 0 0 0 3.64-2.24 4 4 0 0 0 2.24-3.64 4 4 0 0 0-2.5-3.76l-.24-.12V8.5a4 4 0 0 0-2.24-3.64 4 4 0 0 0-3.64-2.24 4 4 0 0 0-3.76 2.5l-.12.24V6.5h-1.5Z"/><path d="M8.5 7.9a1 1 0 1 0-1.8 1.8 1 1 0 0 0 1.8-1.8Z"/><path d="m14.25 11.25-.62-2.12a2.5 2.5 0 1 0-4.25 2.5l2.12.62a2.5 2.5 0 1 0 2.75-1Z"/></svg>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold font-headline tracking-tight text-foreground">
                    JUGANDOSTEAM
                </h1>
            </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Ingresá el link de un juego de Steam para calcular su precio final en pesos argentinos con todos los impuestos.
          </p>
        </header>

        <PriceCalculator />

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Los precios son estimaciones y pueden variar. La tasa de cambio y los impuestos se actualizan periódicamente.
          </p>
          <p>Hecho con ❤️ para la comunidad gamer de Argentina.</p>
        </footer>
      </div>
    </main>
  );
}
