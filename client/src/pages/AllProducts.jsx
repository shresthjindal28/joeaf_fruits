import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  selectAllProducts,
} from "../redux/slices/ProductDataSlice";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ProductCard from "../components/ProductCard";
import { filters } from "../lib/Constants";
import { ToastContainer } from "react-toastify";
import Loader from "../components/Loader";

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [columns, setColumns] = useState(1);
  const [filterButton, setFilterButton] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isTagsVisible, setIsTagsVisible] = useState(false);

  const getSortedProducts = () => {
    if (
      !selectedFilter ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return products || [];
    }

    return [...products].sort((a, b) => {
      switch (selectedFilter) {
        case "Alphabetical":
          return a.name.localeCompare(b.name);

        case "Price (Low to High)":
          return (
            ((a.variants && a.variants[0]?.price) || 0) -
            ((b.variants && b.variants[0]?.price) || 0)
          );

        case "Price (High to Low)":
          return (
            ((b.variants && b.variants[0]?.price) || 0) -
            ((a.variants && a.variants[0]?.price) || 0)
          );

        case "Discount (High to Low)":
          return (b.discountPercentage || 0) - (a.discountPercentage || 0);

        default:
          return 0;
      }
    });
  };

  const filteredProducts = () => {
    const sorted = getSortedProducts();
    if (!searchQuery) return sorted;

    return sorted.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const productList = filteredProducts();

  const handleFilterClick = () => {
    setFilterButton(!filterButton);
  };

  // Compute rows (each row contains multiple products)
  const rowCount =
    productList && Array.isArray(productList)
      ? Math.ceil(productList.length / columns)
      : 0;

  // Render row with multiple items per row
  const ProductRow = ({ index, style }) => {
    if (!productList || !Array.isArray(productList)) {
      return null;
    }

    const startIndex = index * columns; // First product in row
    const items = productList.slice(startIndex, startIndex + columns); // Get products for the row

    return (
      <div
        style={style}
        className="grid 2xl:grid-cols-4 lg:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-4 px-2"
      >
        {items.map((product) => (
          <div
            key={product._id}
            className="transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      await dispatch(getAllProducts());
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch]);

  // Adjust columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1600) {
        setColumns(4); // 2xl: 4 columns
      } else if (window.innerWidth >= 1024) {
        setColumns(3); // lg: 3 columns
      } else if (window.innerWidth >= 480) {
        setColumns(2); // xs: 2 columns
      } else {
        setColumns(1); // Default: 1 column
      }
    };

    updateColumns(); // Set on load
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Show loading state
  if (loading) {
    return <Loader />;
  }

  // Show no products message
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className="flex flex-grow w-full h-screen justify-center items-center bg-gradient-to-b from-amber-50 to-white">
        <div className="text-center p-8 bg-white rounded-2xl shadow-md border border-amber-100">
          <i className="fa-solid fa-basket-shopping text-amber-400 text-6xl mb-6"></i>
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            No Products Available
          </h2>
          <p className="text-amber-700 text-lg">
            Check back later for our fresh selection!
          </p>
          <button className="mt-6 px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg shadow-md hover:from-amber-500 hover:to-amber-600 transition-all">
            Browse Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-b from-amber-50/50 to-white relative">
      <ToastContainer
        position="top-right"
        className="!top-12 !right-6 mt-4 mr-4 z-[9999]"
        toastClassName="!bg-white !text-green-800 !rounded-xl !shadow-lg border-l-4 border-amber-400"
        progressClassName="!bg-gradient-to-r from-amber-400 to-green-600"
        autoClose={3000}
        newestOnTop
      />

      {/* Header and Top Navigation - Compact */}
      <div className="w-full bg-white shadow-sm border-b border-amber-100 py-3 px-4 md:px-6 mb-4 md:h-[20vh] flex flex-col justify-between relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          {/* Top Row - Title and Breadcrumb */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
            <h1 className="text-xl md:text-2xl font-bold text-green-800 flex items-center">
              Premium Mango Collection
              <i className="fa-solid fa-mango ml-2 text-amber-500"></i>
            </h1>

            {/* Product Count */}
            <div className="hidden md:flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100 text-sm">
              <i className="fa-solid fa-cubes text-amber-500"></i>
              <span className="font-medium text-green-800">
                {productList.length} Products
              </span>
            </div>
          </div>

          {/* Filter Section - Compact */}
          <div className="w-full mt-1 relative">
            <div className="flex flex-col md:flex-row gap-2">
              {/* Search Box */}
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-8 pr-3 bg-amber-50/60 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all text-sm"
                />
                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 text-xs"></i>
              </div>

              {/* Sort By - Desktop as Dropdown */}
              <div className="relative md:w-48">
                <button
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="w-full flex items-center justify-between bg-amber-50 border border-amber-200 py-2 px-3 rounded-lg text-green-800 hover:bg-amber-100 transition-colors text-sm"
                >
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-arrow-up-wide-short text-amber-500"></i>
                    <span className="truncate">
                      {selectedFilter || "Sort By"}
                    </span>
                  </div>
                  <i
                    className={`fas fa-chevron-${
                      isFilterDropdownOpen ? "up" : "down"
                    } text-amber-500`}
                  ></i>
                </button>

                {isFilterDropdownOpen && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-amber-200 py-1">
                    {filters.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedFilter(option);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-amber-50 transition-colors text-sm
                          ${
                            selectedFilter === option
                              ? "text-green-800 font-medium bg-amber-50"
                              : "text-green-700"
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                    {selectedFilter && (
                      <button
                        onClick={() => {
                          setSelectedFilter(null);
                          setIsFilterDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 mt-0.5 text-amber-700 hover:bg-amber-50 border-t border-amber-100 font-medium text-sm"
                      >
                        <i className="fa-solid fa-xmark mr-1"></i>
                        Clear Sort
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={handleFilterClick}
                className="md:hidden py-2 px-3 bg-white rounded-lg shadow-sm hover:bg-amber-50 border border-amber-200 flex items-center justify-center gap-1 text-sm"
              >
                <i className="fa-solid fa-sliders text-amber-500"></i>
                <span>Filters</span>
              </button>

              {/* Tag Button - Compact */}
              <button
                onClick={() => setIsTagsVisible(!isTagsVisible)}
                className="hidden md:flex items-center gap-1 text-amber-700 hover:text-amber-800 text-sm py-2 px-3 rounded-lg border border-transparent hover:border-amber-100 hover:bg-amber-50/80 transition-all shadow-sm hover:shadow"
              >
                <i className={`fa-solid fa-tags text-amber-500`}></i>
                <span>Tags</span>
                <i
                  className={`fas fa-chevron-${
                    isTagsVisible ? "up" : "down"
                  } text-xs ml-1`}
                ></i>
              </button>
            </div>

            {/* Tags - Flyout Style */}
            {isTagsVisible && (
              <div className="hidden md:flex flex-wrap gap-2 mt-3 p-3 bg-white/95 backdrop-blur-sm rounded-lg border border-amber-200 shadow-lg absolute z-20 animate-fadeIn">
                {["Fresh", "Organic", "Sweet", "Premium", "Seasonal", "Export Quality", "Farm Fresh"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100/70 text-amber-700 rounded-full text-xs border border-amber-200 hover:border-amber-300 hover:bg-amber-100 cursor-pointer transition-all hover:shadow-sm transform hover:scale-105 flex items-center gap-1"
                    >
                      <i className="fa-solid fa-circle text-[6px] text-amber-400 mr-1"></i>
                      {tag}
                    </span>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Dropdown - Compact */}
      {filterButton && (
        <div className="md:hidden mx-4 mb-3 bg-white rounded-lg shadow-lg p-3 border border-amber-100 animate-fadeIn relative z-20">
          <div className="flex justify-between items-center mb-2 pb-1 border-b border-amber-50">
            <h4 className="text-base font-semibold text-green-800">
              Filter Options
            </h4>
            <button onClick={handleFilterClick} className="text-amber-500">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          <div className="space-y-2">
            <h6 className="font-medium text-amber-700 text-sm">Sort By</h6>
            <div className="grid grid-cols-2 gap-1">
              {filters.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedFilter(option);
                  }}
                  className={`text-left px-2 py-1.5 rounded-lg transition-colors text-xs
                    ${
                      selectedFilter === option
                        ? "bg-amber-100 text-green-800 font-medium"
                        : "bg-amber-50 text-green-700 hover:bg-amber-100"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Mobile Tags */}
            <div className="mt-2 pt-2 border-t border-amber-50">
              <h6 className="font-medium text-amber-700 mb-2 text-sm">
                Popular Tags
              </h6>
              <div className="flex flex-wrap gap-1">
                {["Fresh", "Organic", "Sweet", "Premium", "Seasonal"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs border border-amber-200"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-between mt-2 pt-2 border-t border-amber-50">
              {selectedFilter && (
                <button
                  onClick={() => setSelectedFilter(null)}
                  className="py-1.5 px-3 text-xs bg-white text-amber-700 rounded-lg border border-amber-200 hover:bg-amber-50 transition-colors"
                >
                  Clear Filters
                </button>
              )}
              <button
                onClick={handleFilterClick}
                className="py-1.5 px-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-lg text-xs ml-auto"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Products List (Adjusted for 20vh header) */}
      <div className="flex-1 px-4 md:px-8 pb-6 max-w-7xl mx-auto w-full">
        {/* Product Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-amber-100 overflow-hidden">
          <div className="flex-grow overflow-y-auto [height:calc(100dvh-160px)] hide-scrollbar p-4 relative z-0">
            <div className="h-full">
              {rowCount > 0 ? (
                <AutoSizer>
                  {({ height, width }) => (
                    <List
                      width={width}
                      itemSize={550}
                      height={height}
                      itemCount={rowCount}
                      className="hide-scrollbar"
                      overscanCount={3}
                    >
                      {ProductRow}
                    </List>
                  )}
                </AutoSizer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center py-8">
                    <i className="fa-solid fa-filter-circle-xmark text-amber-300 text-3xl mb-2"></i>
                    <p className="text-base text-green-700 font-medium">
                      No products match your criteria
                    </p>
                    <p className="text-amber-600 mt-1 text-sm">
                      Try adjusting your filters or search query
                    </p>
                    <button
                      onClick={() => {
                        setSelectedFilter(null);
                        setSearchQuery("");
                      }}
                      className="mt-3 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-xs"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
