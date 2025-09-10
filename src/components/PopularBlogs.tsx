import { Heart, MessageCircle } from "lucide-react";

const PopularBlogs = () => {
  const blogs = [
    {
      title: "My Amazing Blog Title 1",
      author: "John Doe",
      likes: 12,
      comments: 44,
    },
    {
      title: "My Amazing Blog Title 2",
      author: "Jane Doe",
      likes: 8,
      comments: 21,
    },
    {
      title: "My Amazing Blog Title 3",
      author: "Thomas Smith",
      likes: 15,
      comments: 30,
    },
    {
      title: "My Amazing Blog Title 4",
      author: "John Smith",
      likes: 5,
      comments: 10,
    },
    {
      title: "My Amazing Blog Title 5",
      author: "Mark Smith",
      likes: 20,
      comments: 60,
    },
  ];

  return (
    <div className="p-2 max-w-xl mx-auto bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Popular Blogs</h2>
      <div className="space-y-4">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="flex flex-col sm:items-center sm:justify-between p-3 border rounded-lg hover:shadow-sm transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-semibold uppercase">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-sm">{blog.title}</p>
                <p className="text-xs text-gray-500">by {blog.author}</p>
              </div>
            </div>

            <div className="flex  gap-4 mt-3 sm:mt-0">
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Heart size={16} className="text-red-500" />
                {blog.likes}
              </div>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <MessageCircle size={16} className="text-blue-500" />
                {blog.comments}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlogs;
