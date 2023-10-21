/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import 'dotenv/config'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'

const START_SEVER = () => {
  const app = express()

  app.use(express.json())

  //Use API v1
  app.use('/v1', APIs_V1)


  app.listen(env.APP_PORT, () => {
    console.log(`3. Back-end sever is running successfully, I am running at localhost:${env.APP_PORT}/`)
  })

  exitHook(() => {
    console.log('4. Disconnecting from MongoDB Cloud Atlas...')
    CLOSE_DB()
    console.log('5. Disconnected from MongoDB')
  })
}

// IIFE

(async () => {
  try {
    console.log('1. Connecting to MongoDB Atlas ...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB successfully')
    START_SEVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()


//Chỉ khi kết nối Database thành công thì mới Start Sever Back-End lên
// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Cloud Atlas'))
//   .then(() => START_SEVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })
