import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {

    // Điều hướng sang tầng service
    const createdBoard = await boardService.createNew(req.body)


    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Something broken')
    //Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) }
}


export const boardController = {
  createNew
}