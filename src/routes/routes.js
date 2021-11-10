import {Router} from 'express';

import swapiRoute from './swapi.route';

const router = Router();


router.get("/",(req, res)=>{
    res.status(200).json({
        Message:"Welcome to Swapi"
    })
});

router.use("/", swapiRoute);

export default router;