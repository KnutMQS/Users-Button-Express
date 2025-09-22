const express = require("express");
const app = express();
const port = 3000;
const dummyUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 30,
    isActive: true,
    roles: ["user", "admin"],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    age: 25,
    isActive: false,
    roles: ["user"],
  },
    {
    id: 3,
    name: "Chad Chaddington",
    email: "chad.chaddington@example.com",
    age: 22,
    isActive: true,
    roles: ["user"],
  },
];
app.use(express.json());
// Serve static files (like your HTML, CSS, and client-side JS) from a 'public' directory
app.use(express.static("public"));

// Define a route to serve your main HTML page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/users.html");
});

// Define a route to handle button clicks (e.g., a POST request)
app.post("/button-click", (req, res) => {
  res.json(dummyUsers);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
