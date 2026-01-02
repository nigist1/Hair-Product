// const mongoose = require('mongoose');
// require('dotenv').config();
// const { Product, User } = require('../models');

// const connectDB = async () => {
//   try {
//     const mongoURI = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb+srv://keab1928_db_user:test@cluster0.owfam4w.mongodb.net/ecommerce_db?retryWrites=true&w=majority';
//     await mongoose.connect(mongoURI,{
//       family: 4, serverSelectionTimeoutMS: 15000 

//     });
//     console.log('✅ Connected to MongoDB');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// const seedProducts = async () => {
//   try {
//     await connectDB();

   
//     let adminUser = await User.findOne({ role: 'Admin' });
//     if (!adminUser) {
   
//       adminUser = await User.create({
//         username: 'admin',
//         email: 'admin@example.com',
//         password: 'Admin123!',
//         role: 'Admin',
//       });
//       console.log('✅ Created admin user');
//     }

//     const products = [
//       {
//         name: "Allison's Hair Growth Oil",
//         description: "Premium all-natural hair growth oil from Guyana. This 4-ounce bottle contains a special blend of natural ingredients designed to promote healthy hair growth, strengthen hair follicles, and improve overall hair health. Made with care by Allison's Hair & Skin, this product is perfect for all hair types.",
//         price: 24.99,
//         stock: 50,
//         category: 'Hair Oil',
//         imageUrl: '/images/allisons-hair-growth-oil.jpg',
        
//         userId: adminUser._id,
//       },
//       {
//         name: "NewYorkBiology Biotin Shampoo",
//         description: "Professional-grade biotin shampoo infused with Vitamin B7, Rosemary Extract, Castor Oil, and Ginger Oil. This 16.9 fl oz (500ml) formula is specifically designed to stimulate hair growth, promote thicker and stronger hair, and improve overall hair health. Perfect for daily use.",
//         price: 19.99,
//         stock: 75,
//         category: 'Shampoo',
//         imageUrl: '/images/newyorkbiology-biotin-shampoo.jpg',
      
//         userId: adminUser._id,
//       },
//       {
//         name: "EELHOE Biotin Hair Growth Serum",
//         description: "Advanced biotin hair growth serum (30ml) that helps with all types of hair loss. This special formula contains biotin which supports healthy hair and growth. Boosts hair growth, protects against hair loss, and strengthens hair follicles. Suitable for all hair types. Apply twice daily for best results.",
//         price: 29.99,
//         stock: 60,
//         category: 'Serum',
//         imageUrl: '/images/eelhoe-biotin-serum.jpg',
//         userId: adminUser._id,
//       },
//       {
//          name: "Jamaican Castor Oil Spray",
//          description: "A hair thickness maximizer that promotes strong, healthy hair growth. This spray contains natural ingredients beneficial for hair health.",
//          price: 15.99,
//          stock: 100,
//          category: "Hair Oil",
//          imageUrl: "/images/jamaican-castor-oil-spray.jpg",
//          userId: adminUser._id,
//       },
//       {
//         name: "Manuka Honey & Mafura Oil Intensive Hydration Conditioner",
//         description: "This conditioner deeply hydrates and replenishes dry, damaged hair with a rich blend of manuka honey and mafura oil.",
//         price: 12.99,
//         stock: 75,
//         category: "Conditioner",
//         imageUrl: "/images/manuka-honey-mafura-oil-conditioner.jpg",
//         userId: adminUser._id,
//       },
//       {
//        name: "Wild Growth Hair Oil",
//        description: "A hair oil designed to promote hair growth and improve overall hair health, enriched with a blend of natural oils.",
//        price: 19.99,
//        stock: 80,
//        category: "Hair Oil",
//        imageUrl: "/images/wild-growth-hair-oil.jpg",
//        userId: adminUser._id,
//      },
//      {
//         name: "Guava Leaf Hair Oil",
//         description: "An Ayurvedic hair oil made from guava leaves, promoting rejuvenation of hair follicles and overall hair health.",
//         price: 17.99,
//         stock: 60,
//         category: "Hair Oil",
//         imageUrl: "/images/guava-leaf-hair-oil.jpg",
//         userId: adminUser._id,
//      },
//      {
//       name: "Hims Hair Regrowth Treatment",
//       description: "A topical solution containing Minoxidil, designed for men to help stimulate hair growth and combat thinning.",
//       price: 29.99,
//       stock: 40,
//       category: "Hair Treatment",
//       imageUrl: "/images/hims-hair-regrowth-treatment.jpg",
//       userId: adminUser._id,
//      },
//      {
//       name: "Cantu Shea Butter Leave-In Conditioner",
//       description: "An intense moisture leave-in conditioner formulated to soften and hydrate hair, perfect for daily use.",
//       price: 11.99,
//       stock: 70,
//       category: "Conditioner",
//       imageUrl: "/images/cantu-leave-in-conditioner.jpg",
//       userId: adminUser._id,
//     },
//     {
//     name: "Crème of Nature Argan Oil Perfect 7 Leave-In Treatment",
//     description: "A multi-benefit leave-in treatment with argan oil for detangling, conditioning, and adding shine to hair.",
//     price: 13.99,
//     stock: 55,
//     category: "Hair Treatment",
//     imageUrl: "/images/creme-of-nature-argan-oil.jpg",
//     userId: adminUser._id,
//     },
//     {
//     name: "Agor Organic Hair Oil",
//     description: "Cold pressed organic hair oil that helps repair damaged hair, nourish scalp, and promote healthy hair growth. This 250ml bottle is made from natural ingredients, ensuring your hair receives the best care while being free from harmful chemicals.",
//     price: 19.99,
//     stock: 30,
//     category: 'Hair Oil',
//     imageUrl: '/images/agor-organic-hair-oil.jpg',
//     userId: adminUser._id,
// },
// {
//     name: "Vatika Olive Enriched Hair Oil",
//     description: "Nourish and protect your hair with Vatika's Olive Enriched Hair Oil. This 200ml bottle is formulated with a blend of natural olive extracts to strengthen hair and provide essential moisture, leaving your hair looking shiny and healthy.",
//     price: 15.99,
//     stock: 40,
//     category: 'Hair Oil',
//     imageUrl: '/images/vatika-olive-hair-oil.jpg',
//     userId: adminUser._id,
// },
//     ];

   
//     for (const productData of products) {
//       const existingProduct = await Product.findOne({ name: productData.name });
//       if (existingProduct) {
//         console.log(`⚠️  Product "${productData.name}" already exists, skipping...`);
//       } else {
//         await Product.create(productData);
//         console.log(`✅ Created product: ${productData.name}`);
//       }
//     }

//     console.log('\n✅ Product seeding completed!');
//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Error seeding products:', error);
//     process.exit(1);
//   }
// };

// seedProducts();


const mongoose = require('mongoose');
require('dotenv').config();
const { Product, User } = require('../models');

const mongoURI =
  process.env.MONGODB_URI ||
  'mongodb+srv://keab1928_db_user:test@cluster0.owfam4w.mongodb.net/ecommerce_db?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      family: 4, // force IPv4
      serverSelectionTimeoutMS: 15000,
    });
    console.log('✅ Connected to MongoDB Atlas');
    console.log('📍 Host:', mongoose.connection.host);
    console.log('📊 Database name:', mongoose.connection.db.databaseName);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await connectDB();

    // Create admin user if not exists
    let adminUser = await User.findOne({ role: 'Admin' });
    if (!adminUser) {
      adminUser = await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'Admin123!',
        role: 'Admin',
      });
      console.log('✅ Created admin user');
    }

    // Products array
    const products = [
      {
        name: "Allison's Hair Growth Oil",
        description: 'Premium all-natural hair growth oil from Guyana...',
        price: 24.99,
        stock: 50,
        category: 'Hair Oil',
        imageUrl: '/images/allisons-hair-growth-oil.jpg',
        userId: adminUser._id,
      },
      {
        name: "NewYorkBiology Biotin Shampoo",
        description: 'Professional-grade biotin shampoo infused with Vitamin B7...',
        price: 19.99,
        stock: 75,
        category: 'Shampoo',
        imageUrl: '/images/newyorkbiology-biotin-shampoo.jpg',
        userId: adminUser._id,
      },
      // add the rest of your products here
    ];

    for (const productData of products) {
      const existingProduct = await Product.findOne({ name: productData.name });
      if (existingProduct) {
        console.log(`⚠️ Product "${productData.name}" already exists, skipping...`);
      } else {
        await Product.create(productData);
        console.log(`✅ Created product: ${productData.name}`);
      }
    }

    console.log('\n✅ Product seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔒 MongoDB connection closed');
    process.exit(0);
  }
};

seedProducts();
