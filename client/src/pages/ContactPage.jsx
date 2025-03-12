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

    // Your WhatsApp number (without "+")
    const phoneNumber = "+919340147425";

    // Encode user input to be URL safe
    const whatsappMessage = encodeURIComponent(
      `Hello, my name is ${formData.name}. 
      My contact number is ${formData.contact}. 
      Here is my message: ${formData.message}`
    );

    // Redirect user to WhatsApp chat
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank");

    // Clear form after sending
    setFormData({ name: "", contact: "", message: "" });
  };

  return (
    <div className="container px-3">
      <div className="max-w-2xl mx-auto m-16 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 border rounded-lg my-2"
          />
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Your Contact Number"
            required
            className="w-full p-3 border rounded-lg my-2"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full p-3 border rounded-lg h-32 my-2"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition my-4"
          >
            Send Message via WhatsApp 📩
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
