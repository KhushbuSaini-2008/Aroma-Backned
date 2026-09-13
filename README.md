# 🌸 Aroma Pages — Backend API

Node.js + Express + MongoDB backend for Aroma Pages E-Commerce.

## 📁 Folder Structure
```
backend/
├── config/         → MongoDB connection
├── controllers/    → Business logic
├── middleware/     → JWT auth middleware
├── models/         → Mongoose schemas
├── routes/         → API endpoints
├── .env            → Environment variables
├── seed.js         → Seed sample data
└── server.js       → Entry point
```

## ⚙️ Setup Instructions

### 1. Install MongoDB
Download from: https://www.mongodb.com/try/download/community
Install and make sure it's running on port 27017.

### 2. Install dependencies
```bash
cd backend
npm install
```

### 3. Configure .env
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/aroma_pages
JWT_SECRET=aromaPages_superSecret_key_2025
```

### 4. Seed the database
```bash
npm run seed
```
This creates all 6 products + admin account.

### 5. Start the server
```bash
npm run dev       # development (auto-restart)
npm start         # production
```

Server runs at: http://localhost:5000

---

## 🔗 API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login & get token |
| GET  | /api/auth/me | Get current user |

### Products
| Method | Route | Description |
|--------|-------|-------------|
| GET  | /api/products | Get all (filter/search/sort/page) |
| GET  | /api/products/featured | Get featured products |
| GET  | /api/products/:id | Get single product |
| POST | /api/products | Create product (admin) |
| PUT  | /api/products/:id | Update product (admin) |
| DELETE | /api/products/:id | Delete product (admin) |
| POST | /api/products/:id/review | Add review (auth) |

### Cart
| Method | Route | Description |
|--------|-------|-------------|
| GET  | /api/cart | Get user's cart |
| POST | /api/cart/add | Add item to cart |
| PUT  | /api/cart/update | Update item quantity |
| DELETE | /api/cart/remove/:id | Remove item |
| DELETE | /api/cart/clear | Clear cart |

### Orders
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/orders | Place new order |
| GET  | /api/orders/my | My orders |
| GET  | /api/orders/:id | Order detail |
| GET  | /api/orders | All orders (admin) |
| PUT  | /api/orders/:id/status | Update status (admin) |

### Users
| Method | Route | Description |
|--------|-------|-------------|
| GET  | /api/users/profile | Get profile |
| PUT  | /api/users/profile | Update profile |
| GET  | /api/users | All users (admin) |

---

## 🔑 Admin Login
```
Email:    admin@aromapages.com
Password: admin123
```

## 🔐 Auth Header
For protected routes, send:
```
Authorization: Bearer <your_token>
```
