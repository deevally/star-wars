"use strict";
import { ResponseCode } from "../utils/constants";
import asyncHandler from "../middlewares/async";



/**
 * @description Get all films
 * @returns {object} Films
 */
 const Films = asyncHandler(async (req, res, next) => {
  
  try {

    const result = await req.service.swapi.Films();
    return res.status(ResponseCode.OK).json({
      success: true,
       result,
    });
  } catch (error) {
    return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
});



/**
 * @description Get all characters
 * @returns {object} People
 */
 const Characters = asyncHandler(async (req, res, next) => {
  const {sortBy, orderBy, gender} =  req.query;

  const sorting  = {
    gender, sortBy, orderBy
  };

  try {

    const result = await req.service.swapi.Characters(sorting);
    return res.status(ResponseCode.OK).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: error.message,
    });
  }
});

export default {
  Films,
  Characters
};
