import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {

    // Điều hướng sang tầng service
    const createdColumn = await columnService.createNew(req.body)

    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Something broken')
    //Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) { next(error) }
}

export const columnController = {
  createNew
}