import CategoryModel from '../model/category.model'
import { BadRequestResponse, SuccessResponse, CreatedResponse, NotFoundResponse } from '../lib/responses'

export default {
    getAll : async(req, res) => {
        let page = req.query.page || 1
        let perpage = req.query.perpage || 10

        let categoriesPerpage = await CategoryModel
        .findAll({
            skip : page * perpage - perpage,
            limit : perpage
        })

        let categories = await CategoryModel.findAndCountAll()

        let data = {
            page,
            perpage,
            total : categories.count,
            data : categoriesPerpage
        }

        SuccessResponse(res, "Success get categories", data)
    },
    getById : async(req, res) => {
        let detail = await CategoryModel.findOne({ where : { id : req.params.id } })
        return SuccessResponse(res, "Success get detail data ", detail)
    },
    create : async(req, res) => {
        if(!req.body.name){
            return BadRequestResponse(res, "Required name")
        }

        let data = {
            name : req.body.name
        }

        let detail = await CategoryModel.create(data)
        return CreatedResponse(res, "Success create category", detail)
    },
    update : async(req, res) => {
        if(!req.body.name){
            return BadRequestResponse(res, "Required name")
        }

        let dataExist = await CategoryModel.findOne({ where : { id : req.params.id } })

        if (dataExist == null) {
            return NotFoundResponse(res, `Data with id ${req.params.id} not found`)
        }

        let data = {
            name : req.body.name
        }

        await CategoryModel.update(data , { where : { id : req.params.id } }, { new : true })
        dataExist = await CategoryModel.findOne({ where : { id : req.params.id } })
        return SuccessResponse(res, "Success update data ", dataExist)
    },
    delete : async(req, res) => {
        let dataExist = await CategoryModel.findOne({ where : { id : req.params.id } })

        if (dataExist == null) {
            return NotFoundResponse(res, `Data with id ${req.params.id} not found`)
        }

        await CategoryModel.destroy({ where : { id : req.params.id } })
        return SuccessResponse(res, `Success delete data with id ${req.params.id}`)
    }
}