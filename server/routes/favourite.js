const express = require("express");
const {handleAddToFavourite, handleGeFavourite, handleRemoveFavourite} = require("../controllers/favourite");

const router = express.Router();

router.get("/", handleGeFavourite);
router.post("/", handleAddToFavourite);
router.delete("/:Id", handleRemoveFavourite);

module.exports =  router;
