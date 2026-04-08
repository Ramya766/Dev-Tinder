const auth= (req, res, next) => {
  console.log("Auth called!!");
  const token = "xyz123";
  const auth = token === "xyz123";
  if (!auth) {
    res.status(401).send("Unauthorized user!");
  } else {
    next();
  }
};
module.exports=auth;