// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

// ../errors as .. since we are in controllers folder, and errors is in root folder

const login = async (req, res) => {
  const { username, password } = req.body;
  // mongoose validation
  // Joi
  // check in the controller

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  //just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  // try to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value!!!!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};

//JWT is a standard for creating access tokens for an application. It is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted.

//JWTs can be used for authentication and information exchange. When used for authentication, the server generates a JWT that certifies the user identity and sends it to the client. The client will send the token back to the server for every subsequent request, allowing the server to verify the token and grant access to protected resources.

//JWT consists of three parts: a header, a payload, and a signature. The header typically consists of two parts: the type of the token (JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA. The payload contains the claims, which are statements about an entity (typically, the user) and additional data. The signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

//JWTs are often used in web applications to manage user sessions and provide secure access to APIs. They are stateless, meaning that the server does not need to store any session information, as all the necessary information is contained within the token itself. This makes JWTs a popular choice for modern web applications, especially those built with single-page applications (SPAs) and microservices architectures.

//JWT Format : xxxxx.yyyyy.zzzzz
// xxxxx = header, yyyyy = payload, zzzzz = signature

//In front-end, we can store the JWT in local storage or cookies. When making requests to the server, we can include the JWT in the Authorization header as a Bearer token. The server can then verify the token and grant access to protected resources if the token is valid.
//syntax
const { data } = axios.get("/api/dashboard", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

//To protect many routes, we can create a middleware function that checks for the presence of a valid JWT in the request headers. If the token is valid, the middleware can allow the request to proceed to the protected route; otherwise, it can return an error response indicating that authentication is required. This way, we can ensure that only authenticated users can access certain parts of our application.
//code
const authenticateUse = require("../middleware/authentication");
app.use("/api/v1", authenticateUser, allRoutes); // all routes after this line will be protected by the authentication middleware
