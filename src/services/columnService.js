
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      getNewColumn.cards = []

      // Cập nhật mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderedIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}
const update = async (columndId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columndId, updateData)

    return updatedColumn
  } catch (error) { throw error }
}
const deleteItem = async (columndId) => {
  try {
    const targetColumn = await columnModel.findOneById(columndId)
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
    }

    //Xoá Column
    await columnModel.deleteOneById(columndId)

    //Xoá toàn bộ Card thuộc Column trên
    await cardModel.deleteManyByColumnId(columndId)

    //Xoá columnId trong mảng columnOrderIds của cái Board chứa nó
    await boardModel.pullColumnOrderedIds(targetColumn)

    return { deleteResult: 'Column and its Cards deleted successfully' }
  } catch (error) { throw error }
}
export const columnService = {
  createNew,
  update,
  deleteItem
}

