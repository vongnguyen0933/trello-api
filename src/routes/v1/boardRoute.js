import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
import { Route } from 'express'


const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get list board' })
  })
  .post(boardValidation.createNew, boardController.createNew)


Router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update)


//API hỗ trợ việc di chuyển card giữa các column khác nhau trong một board
Router.route('/supports/moving_card')
  .put(boardValidation.moveCardToDifferentColum, boardController.moveCardToDifferentColum)

export const boardRoute = Router