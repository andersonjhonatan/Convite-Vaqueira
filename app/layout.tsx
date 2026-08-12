import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Cavalgada Encantada de Helena | Convite Infantil',
  description: 'Convite infantil interativo com pequena vaqueira, cavalo, flores do campo e uma aventura encantada na fazenda.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
