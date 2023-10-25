/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {

  try {
    //Xử lý logic dữ liệu tuỳ đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }
    // Gọi tới tầng Model để xử lý lưu bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard)

    // lấy bản board sau khi gọi(tuỳ từng dự án)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    // Trả kết quả về , service luôn có return trả về
    return getNewBoard

  } catch (error) { throw error }
}

export const boardService = {
  createNew
}