const movieController = {};
import movieModel from "../models/movieModel.js";
import { config } from "../config.js";
import {v2 as cloudinary} from "cloudinary"

cloudinary.config({
    cloud_name : config.CLOUD.NAME,
    api_key :  config.CLOUD.APIKEY,
    api_secret : config.CLOUD.SECRET
})

//SELECT
movieController.getMovies = async (req, res) => {
    const movies = await movieModel.find()
    res.json(movies)                            
}

//INSERT

movieController.createMovie = async (req, res) => {
    const {
        movie,
        description,
        director,
        genre,
        duration,
        releaseYear
    } = req.body;

    let imageURL = ""
    let imageID =  ""

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder : "public",
                allowed_formats : ["png", "jpg", "jpeg"]
            }
        )
        console.log(result.secure_url);
        imageURL = result.secure_url
        imageID = result.public_id
    }
    
    const newMovie = new movieModel({
        movie,
        description,
        director,
        genre,
        duration,
        releaseYear, 
        image : imageURL,
        imageId : imageID
    });
    await newMovie.save()
    res.json({message : "movie saved"})
}

//DELETE

movieController.deleteMovie = async (req, res) => {

    const movie = await movieModel.findById(req.params.id).select("imageId");

    await movieModel.findByIdAndDelete(req.params.id)

    await cloudinary.uploader.destroy(`${movie.imageId}`, function(result) { console.log(result) });

    res.json({message : "movie delete"})
}

//UPDATE

movieController.updateMovie = async (req, res) => {
    const {
        movie,
        description,
        director,
        genre,
        duration,
        releaseYear
    } = req.body;

    let imageURL = ""
    let imageID =  ""

    if(req.file){
        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder : "public",
                allowed_formats : ["png", "jpg", "jpeg"]
            }
        )
        console.log(result.secure_url);
        imageURL = result.secure_url
        imageID = result.public_id
    }

    await movieModel.findByIdAndUpdate(req.params.id, {
        movie,
        description,
        director,
        genre,
        duration,
        releaseYear, 
        image : imageURL,
        imageId : imageID
        },{new : true}
    );
    res.json({ message : "product save"})
}

export default movieController;