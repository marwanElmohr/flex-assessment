import TieredDiscounts from "../components/TieredDiscounts";
import firstImage from "../images/1stImage.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendar,
  faMagnifyingGlass,
  faInfinity,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import Feature from "../components/Feature";
import ChooseDates from "../components/ChooseDates";
import GuestsCount from "../components/GuestsCount";
import CompaniesSec from "../components/CompaniesSec";

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
                  <ChooseDates />
                </div>
              </div>

              {/* guests */}
              <GuestsCount />

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

      <section className="bg-[#FFF9E9] p-12 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Stay Longer, Save More</h1>
        <p className="text-gray-700 mb-6">
          The longer you stay, the more you save – great news for those looking
          for hassle free long term rentals, extended business trips or
          relocations.
        </p>
        <TieredDiscounts />
      </section>

      <section className="text-center bg-[#FFFDF6] p-12">
        <h1 className="text-4xl font-bold mb-4">Corporate Housing</h1>
        <p className="text-gray-700 mb-6">
          The Flex partners with over 150 companies worldwide to deliver
          corporate housing solutions for staffing, employee relocation, and
          temporary accommodations for insurance claims. Our flexible, fully
          furnished rentals are ideal for businesses and insurers seeking
          reliable, move-in ready stays across global locations.
        </p>

        <div className="grid md:grid-cols-3 gap-6 bg-white rounded-xl p-8 text-center shadow-lg hover:shadow-xl ">
          <Feature icon={faMagnifyingGlass} title="Booking Service">
            Skip the hassle — we'll handle your searches. Whether you need one
            apartment or several, we'll quickly deliver the best options
            tailored to your specific needs.
          </Feature>
          <Feature icon={faHandshake} title="Dedicated Account Manager">
            Enjoy personalised service with a dedicated account manager as your
            single point of contact. From new bookings to ongoing stays, you'll
            have expert support every step of the way.
          </Feature>
          <Feature icon={faInfinity} title="Flexible Terms">
            We know plans change. That's why our flexible rental terms let you
            book for as short or long as you need—with month-to-month leases,
            hassle-free extensions, and easy exits to keep your business agile.
          </Feature>
        </div>
      </section>

      <section className="bg-[#FFF9E9] p-12 rounded-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Trusted by 150+ businesses</h1>
        <p className="text-gray-700 mb-6">
          We establish trusted partnerships with our corporate partners,
          providing accommodation to employees relocating for <br /> work. Our
          clients require quality living spaces in prime locations, and they
          occupy these spaces respectfully and responsibly.
        </p>
        <div className="py-16 bg-[#FFF9E9]">
          <CompaniesSec />
        </div>
      </section>
    </div>
  );
}
