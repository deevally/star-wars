import SwapiService from './swapi.service';


const service = () => {

    return Object.freeze({
        swapi: SwapiService
    });
}

const exposeService = async(req, res, next) => {
req.service = service();
next();
}

export default exposeService;