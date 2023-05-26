const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { getRandomName, getRandomReactions } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Drop existing Users
  await User.deleteMany({});

  // Create empty array to hold the Users
  const Users = [];

  // Loop 20 times -- add Users to the Users array
  for (let i = 0; i < 20; i++) {
    // Get some random Reaction objects using a helper function that we imported from ./data
    const Reactions = getRandomReactions(20);

    const fullName = getRandomName();
    const first = fullName.split(" ")[0];
    const last = fullName.split(" ")[1];
    const github = `${first}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}`;

    Users.push({
      first,
      last,
      github,
      Reactions,
    });
  }

  // Add Users to the collection and await the results
  await User.collection.insertMany(Users);

  // Add Thoughts to the collection and await the results
  await Thought.collection.insertOne({
    ThoughtName: "UCLA",
    inPerson: false,
    Users: [...Users],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(Users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
