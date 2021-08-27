const { changeProfile } = require('../controllers/ProfileChange');
const { getMyPost } = require('../controllers/GetMyPost');
require("dotenv").config();
const { Router } = require("express");
const router = Router();

router.patch("/user/profile/:id", changeProfile);
router.get("/user/posting-list/:id", getMyPost);