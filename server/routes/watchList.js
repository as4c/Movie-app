const express = require("express");
const {handleAddToWatchList, handleGetWatchList} = require("../controllers/watchlist");

const router = express.Router();

router.post("/", handleAddToWatchList);
router.get("/", handleGetWatchList);

module.exports =  router;
