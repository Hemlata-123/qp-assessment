const jwt = require("jsonwebtoken");

// Define the payload and secret
const payload = {  
  email: "test@email.com",
  role: "User"
  // email: "trialuser@email.com",
  // role: "Admin",
};
const jwtSecret = "qpassessment";

// Generate the token
const token = jwt.sign(payload, jwtSecret);
//, { expiresIn: "1h" }

console.log("Generated Token:", token);
