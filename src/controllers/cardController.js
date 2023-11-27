import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {

    // Điều hướng sang tầng service
    const createdCard = await cardService.createNew(req.body)

    // throw new ApiError(StatusCodes.BAD_GATEWAY, 'Something broken')
    //Có kết quả thì trả về phía client
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) { next(error) }
}

export const cardController = {
  createNew
}