/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {
    throw new ApiError(StatusCodes.BAD_GATEWAY, 'Something broken')
  } catch (error) { next(error) }
}


export const boardController = {
  createNew
}