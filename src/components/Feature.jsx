import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Feature({ icon, title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-3xl mb-2">
        <FontAwesomeIcon
          icon={icon}
          className="bg-[#CBD4D3] rounded-full p-3"
        />
      </div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{children}</p>
    </div>
  );
}
