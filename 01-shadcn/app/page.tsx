import { ModeToggle } from "@/components/button-theme";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground font-sans">
      <main className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-semibold tracking-tight">Pilih Tema</h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Gunakan tombol di bawah untuk mengganti tema aplikasi.
        </p>
        <ModeToggle />
      </main>
    </div>
  );
}
