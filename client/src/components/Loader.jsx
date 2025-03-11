const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white backdrop-blur-sm">
    <div className="relative size-16">
      <div className="absolute inset-0 border-4 border-green-100 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-green-300 rounded-full animate-spin border-t-transparent"></div>
    </div>
  </div>
);

export default Loader;