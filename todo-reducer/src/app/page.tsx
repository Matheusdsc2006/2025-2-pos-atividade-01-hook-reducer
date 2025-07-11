'use client';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center px-4">
      <div className="text-center bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-10 border border-zinc-200 dark:border-zinc-700 max-w-lg w-full">
        <h1 className="text-4xl font-bold text-zinc-800 dark:text-white mb-6">
          Bem-vindo ao Gerenciador de Tarefas
        </h1>
        <a
          href="/tarefas"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Ir para Lista de Tarefas
        </a>
      </div>
    </main>
  );
}
