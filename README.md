# Endpoints 

#base-url : https://starr-warss-api.herokuapp.com/api/star-wars

This is sorted by release date from the most recent to the oldest.
## Get Movies

```
GET REQUEST

https://starr-warss-api.herokuapp.com/api/star-wars/films
```

## Get Movie Characters

```
GET REQUEST

Sort Query Parameters: {sortBy: "name" or "gender" or "height, orderBy: "desc"}

Example
https://starr-warss-api.herokuapp.com/api/star-wars/characters?sortBy=name&orderBy=desc

Filter Query Parameter:  {gender:"male"}
Example

https://wars-star-app-api.herokuapp.com/api/star-wars/characters?gender=female
```

#RUN IT ON DOCKER VIA

-  docker run -it -p 3000:3000 --name starr-warrs-apii  quotech/starwarsapi:latest
