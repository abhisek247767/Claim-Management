import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#9bc957] p-4 text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-lg hover:text-gray-300 transition">Claim Form</Link>
        <Link to="/claims" className="text-lg hover:text-gray-300 transition">View Claims</Link>
      </div>
    </nav>
  );
};

export default Navbar;
