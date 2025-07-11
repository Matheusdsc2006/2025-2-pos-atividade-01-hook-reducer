'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex justify-between">
      <Link href="/">Home</Link>
      <Link href="/tarefas">Tarefas</Link>
      <Link href="/tarefas/nova">Nova Tarefa</Link>
    </nav>
  );
}