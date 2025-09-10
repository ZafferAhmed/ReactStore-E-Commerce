/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

interface AuthorProps {
  name: string;
  isFollowing: boolean;
  image: string;
}

const TopSellers = () => {
  const [authors, setAuthors] = useState<AuthorProps[]>([]);
  const [numberOfAuthors] = useState(5);

  const fetchAuthors = async () => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${numberOfAuthors}`
      );
      const data = await response.json();
      console.log("data", data.results);

      const authorsData: AuthorProps[] = data.results.map((user: any) => ({
        name: `${user.name.first} ${user.name.last}`,
        isFollowing: false,
        image: user.picture.medium,
      }));

      setAuthors(authorsData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFollowClick = (index: number) => {
    setAuthors((prev) =>
      prev.map((author, i) =>
        i === index ? { ...author, isFollowing: !author.isFollowing } : author
      )
    );
  };

  useEffect(() => {
    fetchAuthors();
  }, [numberOfAuthors]);

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4 mt-4">Top Sellers</h2>
      <div className="space-y-4">
        {authors.map((author, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={author.image}
                alt={author.name}
                className="w-10 h-10 rounded-full border"
              />
              <span className="font-medium text-xs">{author.name}</span>
            </div>

            <button
              onClick={() => handleFollowClick(index)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                author.isFollowing
                  ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              {author.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellers;
