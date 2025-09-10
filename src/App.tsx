import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import TopSellers from "./components/TopSellers";
import PopularBlogs from "./components/PopularBlogs";

const App = () => {
  return (
    <>
      <Router>
        <div className="flex flex-col p-4 min-h-screen">
          <div className="sticky top-0 z-50 bg-white shadow">
            <Header />
          </div>

          <div className="flex flex-1">
            <div className="w-64 border-r shadow-md border-gray-300 sticky top-[64px] self-start max-h-[calc(100vh-60px)] overflow-y-auto">
              <Sidebar />
            </div>

            <div className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              </Routes>
            </div>

            <div className="w-64 sticky gap-2 flex flex-col top-[64px] self-start max-h-[calc(100vh-60px)] overflow-y-auto">
              <TopSellers />
              <PopularBlogs />
            </div>
          </div>

          <div className="shrink-0">
            <Footer />
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
