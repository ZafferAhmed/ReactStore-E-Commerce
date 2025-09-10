/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import { Tally3 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import BookCard from "./BookCard";
import Pagination from "./Pagination";
import Loader from "./Loader";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyWord } =
    useFilter();
  const [sortFilter, setSortFilter] = useState("all");
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 12;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    let URL = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyWord) {
      URL = `https://dummyjson.com/products/search?q=${keyWord}`;
    }

    axios
      .get(URL)
      .then((response) => {
        if (response.data.products.length === 0) {
          toast.error("No products found");
        } else {
          setTimeout(() => {
            setProducts(response.data.products);
            setTotalProducts(response.data.total);
            toast.success("Products fetched successfully");
            setIsLoading(false);
          }, 2000);
        }
      })
      .catch(() => {
        toast.error("Failed to fetch products");
      });
  }, [keyWord, currentPage, selectedCategory, minPrice, maxPrice, searchQuery]);

  const getFilteredProducts = () => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filtered = filtered.filter((product) => product.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filtered = filtered.filter((product) => product.price <= maxPrice);
    }

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortFilter) {
      case "expensive":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "cheap":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "popular":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  };

  const finalFilteredProducts = getFilteredProducts();

  return (
    <>
      <section className="flex items-center p-5 h-full w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Loader />
          </div>
        ) : (
          <div className="w-full">
            <div className="flex flex-col gap-2">
              <div
                className="relative w-fit"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="border px-4 py-2 rounded-full flex items-center cursor-pointer bg-gray-900 text-white hover:bg-gray-700  transform ease-in-out duration-300 hover:scale-105">
                  <Tally3 className="mr-2" />
                  <span className="capitalize">
                    {sortFilter === "all"
                      ? "Filter"
                      : sortFilter.charAt(0).toUpperCase() +
                        sortFilter.slice(1)}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute bg-white border border-gray-300 rounded min-w-max shadow-lg z-10 w-full">
                    <button
                      onClick={() => setSortFilter("cheap")}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-200 w-full"
                    >
                      Cheap
                    </button>
                    <button
                      onClick={() => setSortFilter("expensive")}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-200 w-full"
                    >
                      Expensive
                    </button>
                    <button
                      onClick={() => setSortFilter("popular")}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-200 w-full"
                    >
                      Popular
                    </button>
                    <button
                      onClick={() => setSortFilter("all")}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-200 w-full"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {finalFilteredProducts?.map((product) => (
                  <BookCard
                    product={product}
                    key={product.id}
                    id={product.id}
                  />
                ))}
              </div>

              <div className="flex justify-end">
                <Pagination
                  currentPage={currentPage}
                  totalItems={totalProducts}
                  itemsPerPage={itemsPerPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default MainContent;
