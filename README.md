# 🥭 Fresh Fruits - MERN Stack E-Commerce Platform

[![MERN](https://img.shields.io/badge/Stack-MERN-61DAFB?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/State-Redux-764ABC?logo=redux&logoColor=white)](https://redux.js.org/)

Fresh Fruits is a full-stack e-commerce platform specializing in selling fresh mangoes. Built using the MERN stack (**MongoDB, Express, React, Node.js**), it offers modern features like user authentication, product management, shopping cart, and an admin dashboard.

---

## 🚀 Features

### **User Features**
- 🔐 JWT-based authentication (Login/Register)
- 🏷️ Product browsing with category and origin filters
- 📏 Variant selection (sizes & pricing)
- 🛒 Shopping cart and checkout
- ❤️ Wishlist management
- 📦 Order tracking
- ⭐ Product reviews and ratings
- 📱 Responsive mobile-first design

### **Admin Features**
- 📝 Product CRUD operations
- 📊 Stock & order management
- 👤 User management system
- 💰 Discount and pricing management
- 🌟 Featured product selection
- 📈 Sales analytics dashboard

---

## 🛠 Tech Stack

### **Frontend:**
- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- React Icons

### **Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Cloudinary (Image Storage)

### **Dev Tools:**
- Vite (Frontend Tooling)
- Postman (API Testing)
- Vercel (Frontend Deployment)
- Render (Backend Deployment)

---

## 📦 Installation

### **1️⃣ Clone the repository**
```bash
  git clone https://github.com/Algo53/Fresh_Fruit_Mern.git
  cd Fresh_Fruit_Mern
```

### **2️⃣ Install dependencies**
#### Backend:
```bash
  cd backend
  npm install
```
#### Frontend:
```bash
  cd ../frontend
  npm install
```

### **3️⃣ Set up environment variables**
Create `.env` files in **both** `backend` and `frontend` directories:

#### **backend/.env**
```
PORT=5000
MONGODB_URI=your_monogodb_database_url
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### **frontend/.env**
```
VITE_APP_BACKEND_URL=http://localhost:5000
```

### **4️⃣ Start MongoDB**
Ensure MongoDB is running:
```bash
  sudo systemctl start mongod  # For Linux systems
```

### **5️⃣ Run the application**
#### Start Backend:
```bash
  cd backend
  npm run dev
```
#### Start Frontend:
```bash
  cd frontend
  npm run dev
```

🔗 **Access the Application:**
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:5000`

---

## 🧪 Testing

### **Run backend tests**
```bash
  cd backend
  npm test
```
### **Run frontend tests**
```bash
  cd frontend
  npm run test
```

---

## 🌱 Seed Database (Optional)
```bash
  cd backend
  node utils/seed.js
```

---

## 🚨 Troubleshooting

- **MongoDB Connection Issues:** Ensure MongoDB service is running
- **Environment Variables:** Verify all `.env` files are correctly set up
- **Dependency Errors:** Delete `node_modules` and `package-lock.json`, then reinstall
- **CORS Errors:** Check backend CORS configuration
- **JWT Issues:** Verify secret key and token expiration settings

---

## 🖥 Development Workflow
```bash
  1️⃣ Start MongoDB service
  2️⃣ Run backend: npm run dev (from backend directory)
  3️⃣ Run frontend: npm run dev (from frontend directory)
  4️⃣ Create feature branches for development
  5️⃣ Use Postman for API testing
```

---

## 🛠 Production Build

### **Frontend:**
```bash
  cd frontend
  npm run build
```

### **Backend:**
```bash
  cd backend
  npm install --production
  NODE_ENV=production npm start
```

---

## 🌐 Deployment

### **Frontend (Vercel)**
```bash
  npm install -g vercel
  vercel login
  cd frontend && vercel deploy
```

### **Backend (Render)**
1. Create a new Web Service on **Render**
2. Connect your GitHub repository
3. Set environment variables
4. Use the following build & start commands:
```bash
  npm install
  npm start
```

---

## 🤝 Contributing

### **Steps to contribute:**
1. Fork the repository
2. Create a feature branch:
```bash
  git checkout -b feature/amazing-feature
```
3. Commit your changes:
```bash
  git commit -m 'Add amazing feature'
```
4. Push to your branch:
```bash
  git push origin feature/amazing-feature
```
5. Open a **Pull Request** 🚀

---

## 📄 License
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements
- **MongoDB Atlas** - Database Hosting
- **Cloudinary** - Image Storage
- **Tailwind CSS** - Styling Framework
- **React Community** - Open-source Tools
