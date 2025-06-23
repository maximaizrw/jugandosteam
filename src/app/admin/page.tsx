"use client";

import { useState } from 'react';
import { AdminPriceCalculator } from '@/components/admin-price-calculator';
import { Gamepad2, Home, LockKeyhole, LogIn, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminHome() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2867') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Contraseña incorrecta.');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/20 p-3 rounded-full mb-4 inline-block">
                        <LockKeyhole className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-semibold tracking-tight">Acceso de Administrador</CardTitle>
                    <CardDescription>Ingresá la contraseña para continuar.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (error) setError('');
                            }}
                            className="text-center"
                            aria-label="Contraseña de administrador"
                        />
                         {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full">
                            <LogIn className="mr-2 h-4 w-4" /> Ingresar
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        <Button variant="link" asChild>
                            <Link href="/"><Home className="mr-2 h-4 w-4" />Volver al inicio</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
  }

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
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mt-2">Panel de Administrador</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mt-2">
            Ingresá el precio en dólares de un juego para calcular tu precio de venta final, con tu 10% de ganancia incluido.
          </p>
        </header>

        <AdminPriceCalculator />

        <footer className="mt-12 text-center text-sm text-muted-foreground">
           <Button variant="link" asChild>
                <Link href="/"><Home className="mr-2 h-4 w-4" />Volver a la calculadora de usuario</Link>
           </Button>
          <p>
            Los precios son estimaciones y pueden variar. La cotización del dólar se actualiza periódicamente.
          </p>
          <p>Hecho con ❤️ para ayudarte a vender.</p>
        </footer>
      </div>
    </main>
  );
}
