import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, selectAllProducts } from '../redux/slices/ProductDataSlice';
import ProductList from '../components/ProductList';
import { filters } from '../lib/Constants';

function AllProducts() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const [filterButton, setFilterButton] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const getSortedProducts = () => {
    if (!selectedFilter) return products;

    switch (selectedFilter) {
      case 'Alphabetical':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case 'Price (Low to High)':
        return [...products].sort((a, b) => a.price - b.price);
      case 'Price (High to Low)':
        return [...products].sort((a, b) => b.price - a.price);
      case 'Discount (High to Low)':
        return [...products].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
      default:
        return products;
    }
  };

  const sortedProducts = getSortedProducts();

  const handleFilterClick = () => {
    setFilterButton(!filterButton);
  }

  useEffect( () => {
    dispatch(getAllProducts());
  }, [])

  if (!products || !Array.isArray(products)) {
    return <div className='flex flex-grow w-full h-full justify-center items-center'>No products available</div>;
}

  return (
    <div className="flex w-full h-screen bg-zinc-100">
      {/* Filters Section - Sticky */}
      <div className="md:flex hidden xl:w-1/5 w-1/4 h-full py-4 lg:pl-15 md:pl-5 sticky top-0 overflow-y-auto">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex w-full justify-between items-center">
            <span className="text-2xl font-bold">Filters</span>
            <button
              onClick={() => setSelectedFilter(null)}
              className={`${selectedFilter ? 'flex' : 'hidden'} px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors`}
            >
              Clear all
            </button>
          </div>

          {/* Sorting Filters */}
          <div className="flex flex-col gap-3">
            <span className="text-md font-semibold text-gray-500">Sort By</span>
            {filters.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedFilter(option)}
                className={`text-left px-3 py-2 rounded-lg transition-colors ${selectedFilter === option ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'
                  }`}
              >
                <label className='lg:text-md md:text-xs'>{option}</label>
                {selectedFilter === option && <span className="ml-1 text-blue-500">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable Product List */}
      <div className="flex flex-col flex-grow xl:w-4/5 md:w-3/4 w-full h-full py-4 xl:px-20 lg:px-15 md:px-10 sm:px-15 px-10 gap-3">
        <div className="flex flex-col gap-3">
          <div className='flex justify-between items-center relative'>
            <span className="text-2xl font-bold text-gray-800">Fruits</span>
            <span className={`flex md:hidden text-xl font-semibold text-gray-400 ${filterButton ? "bg-zinc-200 hover:bg-zinc-300" : "hover:bg-zinc-200"} p-1 rounded-md cursor-pointer`} onClick={handleFilterClick}>Filters</span>
            <div className={`${filterButton ? "flex md:hidden" : "hidden"} absolute top-13 right-0 sm:w-1/2 w-full bg-gradient-to-r from-black/90 to-black/80 rounded-md px-3 py-4 text-white z-90`}>
              <div className="flex flex-col gap-3 w-full">
                <div className='flex w-full justify-between items-center'>
                  <span className="text-md font-semibold text-gray-500">Sort By</span>
                  <button
                    onClick={() => {
                      handleFilterClick();
                      setSelectedFilter(null);
                    }}
                    className={`${selectedFilter ? 'flex' : 'hidden'} px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors`}
                  >
                    Clear all
                  </button>
                </div>
                {filters.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      handleFilterClick();
                      setSelectedFilter(option);
                    }}
                    className={`text-left px-3 py-2 rounded-lg transition-colors ${selectedFilter === option ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-500'
                      }`}
                  >
                    <label className='lg:text-md md:text-xs'>{option}</label>
                    {selectedFilter === option && <span className="ml-1 text-blue-500">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {selectedFilter && (
              <>
                <span>Sorted by:</span>
                <span className="font-medium text-blue-400">{selectedFilter}</span>
              </>
            )}
          </div>
        </div>

        {/* Product List - Scrollable */}
        <div className="flex-grow overflow-y-auto h-[calc(100vh-200px)] hide-scrollbar shadow-inner rounded-xl">
          <ProductList allProducts={sortedProducts} />
        </div>
      </div>
    </div>
  );
}

export default AllProducts;