import React from "react";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNumber = "+919340147425";
    const whatsappMessage = encodeURIComponent(
      `Hello, my name is ${formData.name}. 
      My contact number is ${formData.contact}. 
      Here is my message: ${formData.message}`
    );

    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank");
    setFormData({ name: "", contact: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
          <div className="flex flex-col md:flex-row">
            {/* Left column - Contact Info */}
            <div className="md:w-2/5 bg-gradient-to-br from-green-600 to-green-800 p-8 text-white">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="mb-8 text-green-100">
                We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6 mt-12">
                <div className="flex items-start space-x-4">
                  <span className="text-xl">📱</span>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p>+91 93401 47425</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-xl">📧</span>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p>contact@joeaffruits.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-xl">📍</span>
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p>Indore, Madhya Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right column - Form */}
            <div className="md:w-3/5 bg-white p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="I would like to inquire about..."
                    required
                    className="w-full p-3 border-2 border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-4 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                >
                  <span className="mr-2">📩</span>
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
