import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-gray-100 border-t border-gray-300 mt-6">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} React Store. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <a href="" className="hover:text-blue-600 transition">
            Privacy Policy
          </a>
          <a href="" className="hover:text-blue-600 transition">
            Terms of Service
          </a>
          <a href="" className="hover:text-blue-600 transition">
            Support
          </a>
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <a href="" className="hover:text-blue-600 transition">
            <Facebook size={18} />
          </a>
          <a href="" className="hover:text-blue-600 transition">
            <Twitter size={18} />
          </a>
          <a href="" className="hover:text-blue-600 transition">
            <Instagram size={18} />
          </a>
          <a href="" className="hover:text-blue-600 transition">
            <Github size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
