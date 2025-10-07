import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faGrip } from '@fortawesome/free-solid-svg-icons'

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-[#284e4c] shadow py-4">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 text-white">
        <a href="#/" className="hover:cursor-pointer"><img src="image.webp" className='h-8 pl-12' /></a>
        <nav className="space-x-8">
          <a href="#/dashboard" className="hover:cursor-pointer">
            <FontAwesomeIcon icon={faGrip} className="pr-2" />
            Dashboard
          </a>
          <a href="#/property" className="hover:cursor-pointer">
            <FontAwesomeIcon icon={faBuilding} className="pr-1" />
            Property Reviews
          </a>
        </nav>
      </div>
    </header>
  );
}