import Connection from "./conection";

export default async function HeroSection() {
  return (
    <>
      <main>
        <section className="min-h-screen flex items-center justify-center overflow-hidden">
          <div className="relative mx-auto max-w-5xl px-6">
            <div className="lg:flex lg:items-center lg:gap-12">
              <div className="relative z-10 mx-auto max-w-xl text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <div className="flex items-center justify-center bg-background text-foreground font-sans">
                  <main className="flex flex-col items-center justify-center gap-6">
                    <Connection />
                  </main>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
