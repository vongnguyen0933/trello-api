import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use' })
})

// Check API board
Router.use('/boards', boardRoute)

// Check API columns
Router.use('/columns', columnRoute)

// Check API cards
Router.use('/cards', cardRoute)


export const APIs_V1 = Router
