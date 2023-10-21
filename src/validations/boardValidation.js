/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required',
      'string.empty': 'Title cannot be an empty field',
      'string.min': 'should have a minimum length of 3',
      'string.max': 'should have a minimum length of 5',
      'string.trim': 'should be a type of text'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    //abortEarly: false để trường hợp nó có nhiều lỗi validation thì sẽ trả về nhiều lỗi 
    //abortEarly: true (mặc định) nó sẽ trả về 1 lỗi đầu tiên mà gặp
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()

  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
  //   res.status(StatusCodes.CREATED).json({ message: 'POST: API create new board' })
}

export const boardValidation = {
  createNew
}