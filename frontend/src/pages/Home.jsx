import TieredDiscounts from "../components/TieredDiscounts"; 
import firstImage from "../images/1stImage.webp";


export default function Home() {
  const heroUrl =
    "https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=2069&auto=format&fit=crop";

  return (
    <>
      <section
        className="h-[70vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${firstImage})` }}
      >
        <div className=" backdrop-blur-sm p-8 max-w-2xl mx-8">
          <h1 class="text-4xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
             <div>Book</div>
            <div>Beautiful Stays</div>
          </h1>
          <form class="font-sans">
            <div class="bg-[#FFF9E9] rounded-2xl p-2 lg:p-2 shadow-lg flex flex-row gap-1 sm:gap-2 md:gap-0 lg:gap-3">
              
              {</* cities */></>}
              <div class="flex-1 border-gray-200 sm:pr-2 md:pr-4 lg:pr-8 ">
                <div class="flex w-full items-center justify-between rounded-md py-4 text-xs md:text-lg lg:text-sm h-8 lg:h-8 px-1 md:px-4 lg:px-6 bg-transparent border-0 shadow-none">
                  <div class="flex px-6 items-center gap-1 md:gap-3 lg:gap-5 px-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 text-gray-500 flex-shrink-0">
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>City</span>
                    <div className="relative w-full px-12">
                      <select
                        className="apperance-none w-full rounded-md border-gray-200 bg-transparent text-gray-700 text-xs sm:text-sm md:text-lg focus:outline-none focus:ring-0"
                        style={{
                          textShadow: "0 0 0 transparent",
                        }}
                      >
                        <option value="london">London, UK</option>
                        <option value="paris">Paris, France</option>
                        <option value="algiers">Algiers, Algeria</option>
                        <option value="lisbon">Lisbon, Portugal</option>
                      </select>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>

                  </div>
                </div>
              </div>

              {</* dates */></>}
              <div class="flex-1 sm:border-r md:border-r border-gray-200 sm:px-2 md:px-4">
                <div class="inline-flex items-center whitespace-nowrap rounded-md py-2 w-full h-8 sm:h-10 md:h-12 justify-start text-left font-normal text-xs sm:text-sm md:text-lg border-0 bg-transparent hover:bg-transparent px-1 sm:px-2 md:px-0">
                  <div class="flex items-center gap-1 md:gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 text-gray-500 flex-shrink-0">
                      <path d="M8 2v4"></path>
                      <path d="M16 2v4"></path>
                      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                      <path d="M3 10h18"></path>
                    </svg>
                    <span class="text-gray-700 truncate text-xs sm:text-sm md:text-base">Dates</span>
                  </div>
                </div>
              </div>

              {</* guests */></>}
              <div class="flex-1 sm:px-2 md:px-4 flex items-center justify-between">
                <div class="flex items-center gap-1 md:gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-round h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5 text-gray-500 flex-shrink-0">
                    <circle cx="12" cy="8" r="5"></circle>
                    <path d="M20 21a8 8 0 0 0-16 0"></path>
                  </svg>
                  <button class="inline-flex items-center justify-center text-xs h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 p-0 rounded-full hover:bg-gray-100" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4">
                      <path d="M5 12h14"></path>
                    </svg>
                  </button>
                  <span class="text-xs sm:text-sm md:text-lg text-gray-700 min-w-fit px-1">1 Guest</span>
                  <button class="inline-flex items-center justify-center text-xs h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 p-0 rounded-full hover:bg-gray-100" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {</* Search Button */></>}
              <div class="sm:pl-2 md:pl-4">
                <button class="inline-flex items-center justify-center shadow py-2 w-auto h-8 sm:h-10 md:h-12 px-1 sm:px-4 md:px-8 bg-[#284E4C] hover:bg-[#1d3b39] text-white rounded-xl text-xs sm:text-sm md:text-lg font-medium" type="submit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search h-3 w-3 sm:h-4 sm:w-4 md:hidden">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                  <span class="hidden sm:inline md:inline">Search</span>
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
