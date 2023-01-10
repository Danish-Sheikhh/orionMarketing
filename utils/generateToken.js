import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, Shoeshop, {
    expiresIn: "30d",
  });
};

export default generateToken;
