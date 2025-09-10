import { ShoppingCart, Search, User, Phone, Heart } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow-md ">
      <div className="flex items-center ml-14">
        <span className="text-4xl font-bold">R</span>
        <img
          src="https://www.svgrepo.com/show/325612/shop-alt.svg"
          alt="Logo"
          className="w-auto h-14 object-contain"
        />
      </div>

      <div className="flex items-center w-1/2 max-w-lg bg-gray-100 rounded-full px-4 py-2">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 bg-transparent outline-none px-2 text-sm"
        />
      </div>

      <div className="flex items-center gap-6 text-gray-600">
        <button className="flex items-center gap-1 hover:text-blue-600 transition">
          <Phone className="w-5 h-5" />
          <span className="hidden sm:inline text-sm">Contact</span>
        </button>
        <button className="hover:text-blue-600 transition relative">
          <Heart className="w-5 h-5" />
        </button>
        <button className="hover:text-blue-600 transition relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            2
          </span>
        </button>
        <button className="hover:text-blue-600 transition">
          <User className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Header;
