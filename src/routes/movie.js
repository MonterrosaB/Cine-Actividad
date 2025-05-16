import express from "express";
import movieController from "../controllers/movieController.js"
import multer from "multer";

const upload = multer({dest : "public/"})


const router = express.Router()

router.route("/")
.get(movieController.getMovies)
.post(upload.single("image"), movieController.createMovie)

router.route("/:id")
.put(movieController.updateMovie)
.delete(movieController.deleteMovie)

export default router;