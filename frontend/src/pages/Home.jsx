import TieredDiscounts from "../components/TieredDiscounts";

export default function Home() {
  const heroUrl =
    "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=2069&auto=format&fit=crop";

  return (
    <>
      <section
        className="h-[70vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${heroUrl})` }}
      >
        <div className="bg-white/70 backdrop-blur-sm p-8 max-w-2xl mx-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-3">Redefining "Home"</h1>
          <p className="text-gray-700">
            At The Flex, we believe 'home' should never limit your possibilities.
            We exist to redefine how people travel, live and work with solutions
            that prioritise freedom, adaptability, and flexibility.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12 space-y-16">
        <section>
          <h2 className="text-2xl font-bold mb-4">Corporate Housing</h2>
          <p className="text-gray-700 mb-6">
            The Flex partners with over 150 companies worldwide to deliver
            corporate housing solutions for staffing, relocation, and insurance
            claims.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Feature icon="🔍" title="Booking Service">
              Skip the hassle — we’ll handle your searches.
            </Feature>
            <Feature icon="💚" title="Dedicated Account Manager">
              Enjoy personalised service with a dedicated account manager.
            </Feature>
            <Feature icon="🧾" title="Flexible Terms">
              Stay for days, weeks, or months with simple invoicing.
            </Feature>
          </div>
        </section>

        <section className="border-y border-yellow-300 bg-yellow-50 py-10 px-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Stay Longer, Save More</h2>
          <p className="text-gray-700 mb-6">
            The longer you stay, the more you save.
          </p>
          <TieredDiscounts />
        </section>
      </main>
    </>
  );
}

function Feature({ icon, title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );
}
