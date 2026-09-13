const mongoose = require("mongoose");
const dotenv   = require("dotenv");
const Product  = require("./models/Product");
const User     = require("./models/User");

dotenv.config();

const products = [
  { name: "Cute Notebook", category: "Stationery", brand: "Aroma Pages", price: 199, stock: 100, image: "/images/image01.jpg", description: "Aesthetic notebook with soft pastel cover, smooth pages, perfect for journaling and notes.", featured: true },
  { name: "Pastel Pen Set", category: "Stationery", brand: "Aroma Pages", price: 149, stock: 150, image: "/images/image02.jpg", description: "Set of colorful pastel pens with smooth ink flow, perfect for notes, doodles, and creative writing.", featured: true },
  { name: "Cute Study Kit", category: "Stationery Kit", brand: "Aroma Pages", price: 299, stock: 80, image: "/images/image03.jpeg", description: "All-in-one cute study kit including mini notebook, stickers, pen, and bookmarks.", featured: true },
  { name: "Scented Candle", category: "Decor", brand: "Aroma Pages", price: 249, stock: 60, image: "/images/image04.jpg", description: "Relaxing scented candle with soft fragrance, perfect for study vibes and cozy atmosphere." },
  { name: "Sticker Pack", category: "Accessories", brand: "Aroma Pages", price: 99, stock: 200, image: "/images/image05.jpg", description: "Cute aesthetic sticker pack to decorate your notebooks, laptop, and journals." },
  { name: "Desk Organizer", category: "Study Essentials", brand: "Aroma Pages", price: 349, stock: 40, image: "/images/image06.jpg", description: "Stylish desk organizer to keep your stationery neat, clean, and aesthetic.", featured: true },
];

const adminUser = {
  name: "Admin",
  email: "admin@aromapages.com",
  password: "admin123",
  role: "admin",
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany();
    await User.deleteMany({ role: "admin" });

    await Product.insertMany(products);
    await User.create(adminUser);

    console.log("✅ Products seeded:", products.length);
    console.log("✅ Admin user created: admin@aromapages.com / admin123");
    process.exit();
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
};

seedDB();
