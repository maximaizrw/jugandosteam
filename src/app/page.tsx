import { PriceCalculator } from '@/components/price-calculator';
import { Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.012 7.053.072 2.695.272.273 2.69.073 7.052.013 8.333 0 8.74 0 12s.013 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.072c4.362-.2 6.78-2.618 6.98-6.98C23.988 15.667 24 15.26 24 12s-.012-3.667-.072-4.947c-.2-4.362-2.618-6.78-6.98-6.98C15.667.012 15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>
);


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
            Ingresá el precio en dólares de un juego de Steam y te diremos el precio final en pesos si lo comprás con nosotros.
          </p>
        </header>

        <PriceCalculator />

        <footer className="mt-12 text-center text-sm text-muted-foreground">
           <p>
            Los precios son estimaciones y pueden variar. La cotización del dólar y los impuestos pueden cambiar.
          </p>
          <p className="mb-4">Hecho con ❤️ por JUGANDOSTEAM</p>
          <div className="flex justify-center items-center">
            <Link href="https://www.instagram.com/JUGANDOSTEAM" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              <InstagramIcon className="h-5 w-5" />
              <span>@JUGANDOSTEAM</span>
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
