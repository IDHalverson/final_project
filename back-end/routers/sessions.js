const router = require("express").Router();
const { createResponse } = require("../server/util");
const passport = require("passport");

// passport login route
router.post("/", (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (!user) {
        return res.json(createResponse(new Error("Invalid email or password")));
      }
      await req.logIn(user, err => {});
      res.json(createResponse(user));
    } catch (error) {
      res.json(createResponse(err));
    }
  })(req, res, next);
});

router.delete("/", async (req, res) => {
  try {
    await req.logout(() => {});
    res.cookie("connect.sid", "", { expires: new Date() });
    res.json(createResponse());
  } catch (error) {
    console.error(error);
    res.json(createResponse(error));
  }
});

module.exports = router;
