/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Star, Truck, ShieldCheck, ShoppingCart, Tag } from "lucide-react";
import Loader from "./Loader";

interface ProductDetailsProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isloading, setIsloading] = useState(true);

  const fetchProductDetails = async () => {
    setIsloading(true);
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setTimeout(() => {
        setProduct(data);
        setSelectedImage(data.thumbnail || data.images?.[0]);
        setIsloading(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to fetch product details : " + error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product || isloading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <button
        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-80 object-contain rounded-2xl shadow-lg transition"
          />

          <div className="flex gap-2 mt-3 overflow-x-auto">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`preview-${idx}`}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition hover:scale-105 ${
                  selectedImage === img ? "border-2 border-blue-500" : "border"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-1">{product.title}</h1>
          <p className="text-gray-500 mb-4">{product.brand}</p>
          <p className="mb-4">{product.description}</p>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-md">
              -{product.discountPercentage}% OFF
            </span>
          </div>

          <div className="flex items-center gap-2 mb-4 text-sm">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>{product.rating} / 5</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md">
              {product.availabilityStatus}
            </span>
            <span className="text-gray-500">Stock: {product.stock}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1 border px-2 py-1 rounded-md text-sm"
              >
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>

          <div className="space-y-2 mb-6 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <Truck className="w-4 h-4" /> {product.shippingInformation}
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> {product.warrantyInformation}
            </p>
            <p>Return Policy: {product.returnPolicy}</p>
            <p>Min Order Qty: {product.minimumOrderQuantity}</p>
          </div>

          <Link
            to="/cart"
            className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </Link>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 mt-4">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div
                key={idx}
                className="p-3 border rounded-lg shadow-sm hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{review.reviewerName}</span>
                  <span className="font-light">{review.reviewerEmail}</span>
                  <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    {review.rating} ⭐
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                <p className="text-xs text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
