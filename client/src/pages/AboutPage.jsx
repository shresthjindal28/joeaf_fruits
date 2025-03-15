import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 xl:px-30 lg:px-20 md:px-10 sm:px-5 py-10">
      {/* Header Section */}
      <motion.h1
        className="text-4xl pb-3 font-bold text-green-800 mb-6 text-center px-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Joeaf Fruits 🥭
      </motion.h1>

      {/* Image Section */}
      <div className="flex w-full justify-center px-10">
        <motion.img
          src="../../public/images/about/img.jpg"
          alt="Luxury fresh fruits beautifully arranged"
          className="rounded-2xl shadow-lg w-full md:w-2/3 lg:w-1/2 object-cover mb-6 shadow-[0px_10px_14px_-7px_#777373] "
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {/* Description Section */}
      <motion.p
        className="text-lg text-gray-700 max-w-2xl text-center leading-relaxed px-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Welcome to <span className="font-bold text-yellow-700">Joeaf Mangoes</span>, where <strong>premium quality meets unbeatable freshness</strong>! 🥭
        We source <strong>the juiciest, handpicked mangoes</strong> from the finest orchards and deliver them farm-fresh to your doorstep.
        From <strong>**Devgad Alphonso Mango to Ratnagiri, Dussehri to Langra**</strong>, indulge in the <strong>rich flavors of India's best mangoes</strong>, guaranteed to satisfy every craving.
        Enjoy **100% organic, naturally ripened mangoes** with an authentic taste of summer in every bite! 🌿
      </motion.p>

      {/* Call to Action */}
      <motion.a
        href="/shop"
        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all px-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Explore Our Collection 🥭
      </motion.a>
    </div>
  );
};

export default AboutUs;
