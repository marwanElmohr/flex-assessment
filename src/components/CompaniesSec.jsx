import amazon from "../images/amazon.webp";
import allianz from "../images/allianz.webp";
import apple from "../images/apple.webp";
import bt from "../images/bt.webp";
import google from "../images/google.webp";
import kpmg from "../images/kpmg.webp";
import loreal from "../images/loreal.webp";
import meta from "../images/meta.webp";

const logos = [
  { src: amazon, alt: "Amazon" },
  { src: allianz, alt: "Allianz" },
  { src: apple, alt: "Apple" },
  { src: bt, alt: "BT" },
  { src: google, alt: "Google" },
  { src: kpmg, alt: "KPMG" },
  { src: loreal, alt: "L'Oréal" },
  { src: meta, alt: "Meta" },
];

const CompaniesSec = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 md:gap-x-24 gap-y-12 max-w-6xl mx-auto items-center">
      {logos.map((logo) => (
        <div key={logo.alt} className="flex items-center justify-center p-4">
          <div className="relative h-16 w-full group">
            {/* Full-color logo on hover */}
            <img
              src={logo.src}
              alt={`${logo.alt} logo`}
              className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            {/* Masked green version (default) */}
            <div
              className="absolute inset-0 w-full h-full opacity-100 group-hover:opacity-0 transition-opacity duration-300"
              style={{
                backgroundColor: "rgb(40, 78, 76)",
                WebkitMaskImage: `url(${logo.src})`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                WebkitMaskSize: "contain",
                maskImage: `url(${logo.src})`,
                maskRepeat: "no-repeat",
                maskPosition: "center",
                maskSize: "contain",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompaniesSec;
