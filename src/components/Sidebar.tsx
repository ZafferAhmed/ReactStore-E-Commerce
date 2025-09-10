/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import toast, { Toaster } from "react-hot-toast";

interface Products {
  category: string;
}

interface FetchResponse {
  products: Products[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyWord,
    setKeyWord,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (categories: string) => {
    setSelectedCategory(categories);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyWord(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyWord("");
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data: FetchResponse = await response.json();
      const uniqueCategories = Array.from(
        new Set(data?.products.map((product) => product.category))
      );
      setCategories(uniqueCategories);
      toast.success("Categories fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-64 p-5 h-full flex flex-col border-gray-400">
        <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
        <section className="flex gap-3 justify-center flex-col">
          <input
            className="border-2 border-gray-500 rounded p-2 sm:mb-0 focus:outline-none w-full"
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            name="search"
            id="search"
          />
          <div className="flex gap-3 justify-between items-center">
            <div>
              <input
                type="number"
                step="0.01"
                className="border-2 border-gray-500 rounded mr-2 px-1 py-2 mb-3 focus:outline-none w-full"
                placeholder="Min"
                value={minPrice !== undefined ? minPrice : ""}
                onChange={handleMinPriceChange}
                name="min"
                id="min"
              />
            </div>
            <div>
              <input
                type="number"
                step={0.01}
                className="border-2 border-gray-500 rounded mr-2 px-1 py-2 mb-3 focus:outline-none w-full"
                placeholder="Max"
                value={maxPrice !== undefined ? maxPrice : ""}
                onChange={handleMaxPriceChange}
                name="max"
                id="max"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Categories</h2>
          </div>

          <section>
            <div className="flex flex-col text-start">
              {categories.map((category, index) => {
                return (
                  <label
                    key={index}
                    className={`block mb-2 cursor-pointer capitalize ease-in-out duration-500 hover:scale-105 ${
                      selectedCategory === category
                        ? " text-white bg-blue-400 px-3 py-2 rounded hover:text-black"
                        : " text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    <input
                      type="radio"
                      value={category}
                      className="mr-2 w-[14px] h-[14px] cursor-pointer"
                      onChange={() => handleRadioChangeCategories(category)}
                      checked={selectedCategory === category}
                    />
                    {category}
                  </label>
                );
              })}
            </div>
          </section>

          <div>
            <h2 className="text-xl font-semibold mb-3">Keywords</h2>
          </div>

          <div className="flex flex-col text-start">
            {keywords.map((keyword, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={`block mb-2 px-4 py-1 w-full border text-left rounded capitalize ease-in-out duration-300 hover:scale-105 cursor-pointer ${
                    keyword === keyWord
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:bg-gray-200"
                  }`}
                  onClick={() => handleKeywordClick(keyword)}
                >
                  {keyword}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5 cursor-pointer ease-in-out duration-500 hover:scale-105"
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
        </section>

        <div className="sticky z-10">
          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
