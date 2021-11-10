# Endpoints 

#base-url : https://wars-star-app-api.herokuapp.com/api/star-wars

This is sorted by release date from the most recent to the oldest.
## Get Movies

```
GET REQUEST

https://wars-star-app-api.herokuapp.com/api/star-wars/films
```

## Get Movie Characters

```
GET REQUEST

Sort Query Parameters: {sortBy: "name" or "gender" or "height, orderBy: "desc"}

Example
https://wars-star-app-api.herokuapp.com/api/star-wars/characters?sortBy=height&orderBy=desc

Filter Query Parameter:  {gender:"male"}
Example

https://wars-star-app-api.herokuapp.com/api/star-wars/characters?gender=female
```

#RUN IT ON DOCKER VIA

-  docker run -it -p 3000:9000 --name starr-warrs-apii  quotech/starwarsapi:latest
