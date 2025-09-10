import { Link } from "react-router-dom";

interface Products {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  rating: number;
}

interface BookCardProps {
  product: Products;
  id: number;
}

const BookCard = ({ product }: BookCardProps) => {
  return (
    <>
      <Link
        to={`/product/${product.id}`}
        key={product.id}
        className="border p-3 rounded shadow"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-38 object-contain rounded"
        />
        <h3 className="font-semibold mt-2">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
        <p className="text-sm text-yellow-500">⭐ {product.rating}</p>
      </Link>
    </>
  );
};

export default BookCard;
