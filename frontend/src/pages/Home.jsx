import TieredDiscounts from "../components/TieredDiscounts";
import firstImage from "../images/1stImage.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendar,
  faUser,
  faMinus,
  faPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div>
      <section
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${firstImage})` }}
      >
        <div>
          <div className="text-4xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight my-4">
            <h1>Book</h1>
            <h1>Beautiful Stays</h1>
          </div>
          <form>
            <div className="bg-[#FFF9E9] rounded-2xl p-6 shadow-lg flex flex-row gap-12 justify-start">
              {/* cities */}
              <div className="flex items-center justify-between">
                <FontAwesomeIcon icon={faLocationDot} />
                <select
                  className="rounded-md border-gray-200 bg-transparent text-gray-700 focus:outline-none hover:cursor-pointer"
                  defaultValue={"city"}
                >
                  <option value="city" disabled hidden>
                    City
                  </option>
                  <option value="london">London, UK</option>
                  <option value="paris">Paris, France</option>
                  <option value="algiers">Algiera, Algeria</option>
                  <option value="lisbon">Lisbon, Portugal</option>
                </select>
              </div>

              {/* dates */}
              <div className="flex items-center justify-between border-l border-gray-200">
                <div className="rounded-md px-4 bg-transparent hover:cursor-pointer">
                  <FontAwesomeIcon icon={faCalendar} />
                  <span className="text-gray-700 pl-2">Dates</span>
                </div>
              </div>

              {/* guests */}
              <div className="flex items-center justify-between border-l border-gray-200">
                <FontAwesomeIcon icon={faUser} className="px-2" />
                <button
                  className="rounded-full hover:bg-gray-100"
                  type="button"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="text-gray-700 px-2">1 Guest</span>
                <button
                  className="rounded-full hover:bg-gray-100"
                  type="button"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              {/* Search Button */}
              <div>
                <button
                  className="shadow py-2 px-1 sm:px-4 md:px-8 bg-[#284E4C] hover:bg-[#1d3b39] text-white rounded-xl"
                  type="submit"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="pr-2" />
                  <span className="hidden sm:inline md:inline">Search</span>
                </button>
              </div>
            </div>
          </form>
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
    </div>
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
