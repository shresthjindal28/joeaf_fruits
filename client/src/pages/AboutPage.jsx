import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full bg-gradient-to-tr from-orange-400 via-amber-300 to-yellow-300 py-12 md:py-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-8">
          About <span className="text-yellow-700">Joeaf Fruits</span> 🥭
        </h1>
        <div className="h-1 w-24 bg-green-600 mx-auto mb-10 rounded-full"></div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <img
              src="/images/about/img.jpg"
              alt="Luxury fresh fruits beautifully arranged"
              className="rounded-3xl w-full max-w-full h-auto object-cover shadow-2xl"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white/90 p-8 md:p-10 rounded-2xl shadow-lg">
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Welcome to{" "}
                <span className="font-bold text-yellow-700">Joeaf Mangoes</span>,
                where <span className="font-semibold text-green-700">premium quality meets unbeatable freshness</span>! 🥭 
                We source <span className="font-semibold text-green-700">the juiciest, handpicked mangoes</span> from the finest orchards and deliver them farm-fresh to your doorstep.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                From <span className="font-semibold text-green-700">Devgad Alphonso, Ratnagiri, Dussehri, to Langra</span>, 
                indulge in the <span className="font-semibold text-green-700">rich flavors of India's best mangoes</span>. 
                Enjoy 100% organic, naturally ripened mangoes with an authentic taste of summer in every bite! 🌿
              </p>

              {/* Call to Action */}
              <div className="mt-6">
                <a
                  href="/shop"
                  className="inline-block px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                >
                  Explore Our Collection 🥭
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
