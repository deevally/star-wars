import {Router} from "express";
const router = Router();
import UserController from '../controllers/swapi.controller';


router.get("/films", UserController.Films)
router.get("/characters", UserController.Characters)




export default router;