import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, selectAllProducts } from '../redux/slices/ProductDataSlice';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ProductCard from '../components/ProductCard';
import { filters } from '../lib/Constants';

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [columns, setColumns] = useState(1);
  const [filterButton, setFilterButton] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const getSortedProducts = () => {
    if (!selectedFilter || !products || products.length === 0) return products;

    return [...products].sort((a, b) => {
      switch (selectedFilter) {
        case 'Alphabetical':
          return a.name.localeCompare(b.name);

        case 'Price (Low to High)':
          return (a.variants[0]?.price ?? 0) - (b.variants[0]?.price ?? 0);

        case 'Price (High to Low)':
          return (b.variants[0]?.price ?? 0) - (a.variants[0]?.price ?? 0);

        case 'Discount (High to Low)':
          return (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0);

        default:
          return 0;
      }
    });
  };

  const sortedProducts = getSortedProducts();

  const handleFilterClick = () => {
    setFilterButton(!filterButton);
  }

  // Compute rows (each row contains multiple products)
  const rowCount = Math.ceil(sortedProducts.length / columns);

  // Render row with multiple items per row
  const ProductRow = ({ index, style }) => {
    const startIndex = index * columns; // First product in row
    const items = sortedProducts.slice(startIndex, startIndex + columns); // Get products for the row

    return (
      <div style={style} className={`flex grid grid-cols-${columns} sm:gap-0`}>
        {items.map((product) => (
          <div key={product._id} className="flex-1 min-w-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [])

  // Adjust columns based on screen size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth >= 1536) {
        setColumns(4); // 2xl: 3 columns
      } else if (window.innerWidth >= 1024) {
        setColumns(3); // lg: 3 columns
      } else if (window.innerWidth >= 500) {
        setColumns(2); // xs: 2 columns
      } else {
        setColumns(1); // Default: 1 column
      }
    };

    updateColumns(); // Set on load
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  if (!products || !Array.isArray(products)) {
    return <div className='flex flex-grow w-full h-full justify-center items-center'>No products available</div>;
  }

  return (
    <div className="flex w-screen h-screen pb-10 overflow-hidden">
      {/* Filters Section - Sticky */}
      <div className="hidden md:block min-h-screen xl:w-1/4 lg:w-1/4 w-54 py-4 xl:pl-10 lg:pl-6 md:pl-4 xl:pr-12 lg:pr-5 md:pr-2 bg-white/80 backdrop-blur-lg border-r-2 border-amber-100 sticky top-0">
        <div className="flex flex-col gap-6 w-full h-full">
          <h4 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <i className="fa-solid fa-filter" />
            Filters
          </h4>

          <div className="space-y-4">
            <h6 className="text-lg font-semibold text-amber-700">Sort By</h6>
            <div className='flex flex-col gap-2'>
              {filters.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedFilter(option)}
                  className={`w-full text-left px-2 py-2 rounded-xl transition-all flex items-center justify-between 
                                    ${selectedFilter === option
                      ? 'bg-gradient-to-r from-amber-200 to-green-100 border-2 border-amber-300'
                      : 'hover:bg-amber-50 border-2 border-transparent'}`}
                >
                  <span className="text-green-800 xl:text-lg lg:text-[16px] md:text-xs">{option}</span>
                  {selectedFilter === option &&
                    <i className="fa-solid fa-check text-amber-600 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          {selectedFilter && (
            <button
              onClick={() => setSelectedFilter(null)}
              className="mt-4 w-full py-2 text-sm bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-xmark" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Content - Scrollable Product List */}
      <div className="flex-1 pt-6 px-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="sm:text-3xl text-xl font-bold text-green-800">
            Fresh Fruits Collection
            <i className="fa-solid fa-leaf text-amber-600 sm:ml-3 ml-1" />
          </span>

          {/* Mobile Filters Button */}
          <button
            onClick={handleFilterClick}
            className="md:hidden p-2 bg-white rounded-xl shadow-md hover:bg-amber-50 border-2 border-amber-100"
          >
            <i className="fa-solid fa-sliders text-amber-600" />
          </button>
        </div>

        {/* Mobile Filters Dropdown */}
        {filterButton && (
          <div className="lg:hidden mb-6 bg-white rounded-xl shadow-lg p-4 border-2 border-amber-100">
            <div className="flex flex-col gap-4">
              <div className='flex w-full justify-between items-center'>
                <h4 className="sm:text-lg text-md font-semibold text-amber-700">Sort By</h4>
                {selectedFilter && (
                  <button
                    onClick={() => {
                      handleFilterClick();
                      setSelectedFilter(null)
                    }}
                    className="w-max py-1 px-3 text-sm bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-xmark" />
                    Clear Filters
                  </button>
                )}
              </div>
              {filters.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    handleFilterClick();
                    setSelectedFilter(option);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors 
                                        ${selectedFilter === option
                      ? 'bg-amber-100 text-amber-800'
                      : 'hover:bg-amber-50'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-grow overflow-y-auto [height:calc(100dvh-100px)] hide-scrollbar shadow-inner rounded-xl p-3">
          <div className="h-full">
            <AutoSizer>
              {({ height, width }) => (
                <List
                  width={width}
                  itemSize={550}
                  height={height}
                  itemCount={rowCount}
                  className="hide-scrollbar"
                >
                  {ProductRow}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;