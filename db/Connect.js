const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

//We can also use the following code to connect to MongoDB using async/await syntax:
// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected successfully");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//   }
// }

//PRO TIP
// What you can’t do is run multiple awaits in parallel if you write them sequentially. For example:

// Sequential (slower)
//const user = await db.getUser(id);
//const orders = await db.getOrders(id);
//This waits for getUser to finish before starting getOrders.

//Instead, you can run them concurrently:

// Parallel (faster)
//const [user, orders] = await Promise.all([
//  db.getUser(id),
//  db.getOrders(id)
//  ]);

//We generally use the first approach (sequential) when the second operation depends on the result of the first operation. Otherwise, we can use the second approach (parallel) to improve performance.

//We generally start the server only after the database connection is established. This ensures that the application doesn't start handling requests before it's ready to interact with the database.Hence we can use the following code to start the server after the database connection is established:
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });
//in app.js

//While Mongodb does not require a schema, it is often beneficial to define one using Mongoose. This allows for data validation, default values, and other features that can help maintain data integrity. For example, you can define a schema for a User model like this:

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    private: true, // This will prevent the email from being returned in queries by default
    filter: (value) => value.toLowerCase(), // This will convert the email to lowercase before saving
    match: [/.+@.+\..+/, "Please enter a valid email address"], // This will validate the email format
    map: (value) => value.trim(), // This will trim whitespace from the email before saving
    maxlength: [100, "Email address is too long"], // This will limit the email length to 100 characters
  },
});

//Model => Models are responsible for creating and reading documents from the underlying MongoDB database. A model is a wrapper for the schema, providing an interface to interact with the database. You can create a model from the schema like this:

const User = mongoose.model("User", userSchema);

const firstUser = new User({
  name: "John Doe",
  email: "john.doe@example.com",
});

// Save the example user to MongoDB (Atlas). If the user already exists (unique email), this will error.
firstUser
  .save()
  .then((doc) => {
    console.log("User saved:", doc);
    // close the connection when done
    return mongoose.connection.close();
  })
  .then(() => console.log("MongoDB connection closed"))
  .catch((err) => console.error("Error saving user:", err));

// Note: In a real application, you would typically not save a user like this in the connection file. This is just for demonstration purposes. You would usually have separate routes and controllers to handle user creation and other operations.
//For example
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Queries are not promiswes by default, but they can be made to return promises by using the exec() or .then() method. For example, to find a user by email, you can do:
User.findOne({ email: "john.doe@example.com" }).exec();
//Hence we can use async/await syntax to handle the query like this:
async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      console.log("User not found");
      return null;
    }
    console.log("User found:", user);
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw error;
  }
}

//Study model.find() from docs as it has many variants and options. It is a powerful method for querying the database and can be used to retrieve multiple documents that match certain criteria. For example, you can use it to find all users with a specific name:

//to get all users of db
async function getAllUsers() {
  try {
    const users = await User.find().exec();
    console.log("All users:", users);
    return users;
  } catch (error) {
    console.error("Error retrieving users:", error);
    throw error;
  }
}

//You need async because talking to a database (like MongoDB Atlas) takes time. Node.js does not stop and wait for the database; it keeps running other code.To handle this background waiting properly, you use async/await:javascript// Express passes (req, res), JavaScript makes it 'async'
app.get("/users", async (req, res) => {
  // 'await' pauses this specific function until MongoDB responds
  const users = await User.find();

  // This lines runs ONLY after the database successfully returns data
  res.json(users);
});
//Use code with caution.3. What happens if you remove async?If you forget to use async and await, your code will return a blank Promise object to the user instead of the actual data:javascript// WRONG: No async/await
app.get("/users", (req, res) => {
  const users = User.find(); // This returns a raw, unfinished Promise instantly
  res.json(users); // Sends {} or an empty object to the frontend!
});
