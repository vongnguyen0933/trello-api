/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */


import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo đối tượng trelloDatabaseInstance ban đầu là null (vì chưa kết nối)
let trelloDatabaseInstance = null

//khởi tạo một đối tượng mongoClientInstance để kêt nối tới mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// kết nối DATABASE
export const CONNECT_DB = async () => {
  //Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()
  // Lấy thành công thì lấy ra Database theo tên và gán ngược nó laị vào biến trelloDatabaseInstance đã khai báo ở trên
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Function GET_DB này có nhiệm vụ export ra trelloDatabaseInstance sau khi đã connect tới MongoDB để chúng ta tái sử dụng ở nhiều nơi khác nhau
// Lưu ý: phải đảm bảo chỉ luôn gọi hàm getDB này sau khi đã kết nối tới MongoDB

export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to Database first')
  return trelloDatabaseInstance
}

//Đóng kết nối với database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}