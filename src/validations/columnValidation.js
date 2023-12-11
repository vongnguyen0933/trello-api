import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict()
  })
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}
const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    // Nếu cần làm thêm tính năng di chuyển Column sang Board khác thì mới thêm validate boardId
    // boardId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().min(3).max(50).trim().strict(),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )

  })

  try {
    //abortEarly: false để trường hợp nó có nhiều lỗi validation thì sẽ trả về nhiều lỗi
    //abortEarly: true (mặc định) nó sẽ trả về 1 lỗi đầu tiên mà gặp
    //allowUnknow: đối với trường hợp update , cho phép Unknow để không cần đẩy một số field lên
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })

    next()

  } catch (error) {
    // const errorMessage = new Error(error).message
    // Lỗi không nhảy về middleware xử lý tập trung vì thiểu new ApiError
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))

    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   errors: new Error(error).message
    // })
  }
  //   res.status(StatusCodes.CREATED).json({ message: 'POST: API create new board' })
}
export const columnValidation = {
  createNew,
  update
}

