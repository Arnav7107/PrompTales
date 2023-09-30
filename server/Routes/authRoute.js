// const router = require("express").Router();

// const { signup, login } = require("../Controllers/AuthControllers")

// router.post("/");
// router.post("/signup",signup);
// router.post("/login",login);

// module.exports = router;


const { register, login, createStory, updateLike, getStories, saveStory, getSaved, removeFromSaved, likeStory, getLiked,removeFromLiked  } = require("../Controllers/AuthControllers");
const { checkUser } = require("../Middlewares/authMiddleware");

const router = require("express").Router();

router.post("/", checkUser); 
router.post("/register", register);
router.post("/login", login);
router.post("/create",createStory);
router.post("/like/:id",updateLike);
router.get("/stories",getStories);
router.post("/save",saveStory);
router.get('/getsaved',getSaved);
router.post("/removefromsaved",removeFromSaved);
router.post('/like',likeStory);
router.get('/getliked',getLiked);
router.post("/removefromliked",removeFromLiked);

module.exports = router;
