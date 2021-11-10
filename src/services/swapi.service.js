import httpRequest from "../utils/httpRequest";
import convertCmToFtIn from "../utils/helper";
import ErrorResponse from "../utils/error.response";
import { ResponseCode } from "../utils/constants";
import _ from "lodash";
/**
 * @description Film  Service
 * @class FilmService
 */

/**
 * @description Get all films
 * @returns {object} film
 */
async function Films() {
  const getAllFilms = await httpRequest.GetRequest(
    `${process.env.base_url}/films`
  );

  if (getAllFilms.statusCode === 400)
    throw new ErrorResponse(getAllFilms.Message, ResponseCode.BAD_REQUEST);
  let films = getAllFilms.results;

  //sort movies
  let res = films.sort((a, b) =>
    new Date(b.release_date) - new Date(a.release_date)
      ? -1
      : new Date(b.release_date) === new Date(a.release_date)
      ? new Date(b.release_date) - new Date(a.release_date)
        ? -1
        : 1
      : 1
  );

  let char = [];
  for (let i in res) {
    char.push(res[i].characters);
  }

  //flatten the array
  let flattendArray = char.flat();

  //get unique values in array
  let charSet = new Set(flattendArray);

  // function to return selected properties from sorted movies
  function selectProps(...props) {
    return function (obj) {
      const newObj = {};
      props.forEach((name) => {
        newObj[name] = obj[name];
      });

      return newObj;
    };
  }

  const newFilms = res.map(
    selectProps("title", "opening_crawl", "release_date")
  );

  //return results
  const filmData = {
    count: films.length,
    next: getAllFilms.next,
    previous: getAllFilms.previous,
    results: newFilms, //res
    totalNoOfCharacters: charSet.size,
  };
  return filmData;
}
/**
 * @description Get all characters
 * @returns {object} characters
 */
async function Characters({ gender, sortBy, orderBy }) {
  const people = await httpRequest.GetRequest(`${process.env.base_url}/people`);

  if (people.statusCode === 400)
    throw new ErrorResponse(people.Message, ResponseCode.BAD_REQUEST);

  let characters = people.results;
  let res;

  //sort by height
  if (sortBy === "height" && orderBy === "desc") {
    res = characters.sort((a, b) => b.height - a.height);
  } else {
    res = characters.sort((a, b) => a.height - b.height);
  }

  //sort by gender
  if (sortBy === "gender" && orderBy === "desc") {
    res = characters.sort((a, b) => b.gender - a.gender);
  } else {
    res = characters.sort((a, b) => a.gender - b.gender);
  }

  //sort by name
  if (sortBy === "name" && orderBy === "desc") {
    res = characters.sort((a, b) =>
      b.name.localeCompare(a.name, undefined, { caseFirst: "false" })
    );
  } else {
    res = characters.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { caseFirst: "false" })
    );
  }

  //Filter by gender
  let genderdata = people.results;
  let filterData = genderdata.filter((p) => p.gender === gender);

  let peopleHeight = 0;
  let totalFilteredGenderHeight = 0;

  for (let h of filterData) {
    totalFilteredGenderHeight += Number(h.height);
  }

  for (let j of characters) {
    peopleHeight += Number(j.height);
  }

  let height = convertCmToFtIn(peopleHeight);
  let genderHeight = convertCmToFtIn(totalFilteredGenderHeight);
  const filteredCharacters = {
    totalNoCharacters: filterData.length,
    totalCharacterHeight: ` ${totalFilteredGenderHeight}cm, ${genderHeight.feet}ft,  ${genderHeight.inches}in`,
    results: filterData,
  };

  const sortedCharacters = {
    totalNoCharacters: res.length,
    totalCharacterHeight: ` ${peopleHeight}cm, ${height.feet}ft,  ${height.inches}in`,
    results: res,
  };
  if (filterData.length > 0) return filteredCharacters;
  return sortedCharacters;
}
export default {
  Films,
  Characters,
};
