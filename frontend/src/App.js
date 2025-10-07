import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ReviewsPage from "./pages/ReviewsPage";
import PropertyReviews from "./pages/PropertyReviews";

export default function App() {
  const [hash, setHash] = useState(window.location.hash || "#/");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const page = hash.startsWith("#/dashboard")
    ? "dashboard"
    : hash.startsWith("#/property")
    ? "property"
    : "home";

  return (
    <>
      <NavBar />
      {page === "dashboard" ? (
        <ReviewsPage />
      ) : page === "property" ? (
        <PropertyReviews />
      ) : (
        <Home />
      )}
    </>
  );
}
