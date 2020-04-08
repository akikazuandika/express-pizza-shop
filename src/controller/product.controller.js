import ProductModel from '../model/product.model'
import CategoryModel from '../model/category.model'
import { BadRequestResponse, SuccessResponse, CreatedResponse, NotFoundResponse } from '../lib/responses'

export default {
    getAll : async(req, res) => {
        let page = req.query.page || 1
        let perpage = req.query.perpage || 10

        let productsPerpage = await ProductModel
        .findAll({
            skip : page * perpage - perpage,
            limit : perpage
        })

        let products = await ProductModel.findAndCountAll()

        let data = {
            page,
            perpage,
            total : products.count,
            data : productsPerpage
        }

        SuccessResponse(res, "Success get products", data)
    },
    getById : async(req, res) => {
        let detail = await ProductModel.findOne({ where : { id : req.params.id } })

        if (detail == null) {
            return NotFoundResponse(res, `Data with id ${req.params.id} not found`)
        }

        return SuccessResponse(res, "Success get detail data ", detail)
    },
    create : async(req, res) => {
        if(!req.body.name || !req.body.category || !req.body.price){
            return BadRequestResponse(res, "Required name, category and price")
        }

        let existCategory = await CategoryModel.findOne({ where : { id : req.body.category } })

        if (existCategory == null) {
            return NotFoundResponse(res, `Data with category id ${req.body.category} not found`)
        }

        let data = {
            name : req.body.name,
            category : req.body.category,
            price : req.body.price,
        }

        let detail = await ProductModel.create(data)
        return CreatedResponse(res, "Success create product", detail)
    },
    update : async(req, res) => {
        let dataExist = await ProductModel.findOne({ where : { id : req.params.id } })

        if (dataExist == null) {
            return NotFoundResponse(res, `Data with id ${req.params.id} not found`)
        }

        let data = {}
        req.body.name ? data.name = req.body.name : null
        req.body.price ? data.price = req.body.price : null

        if(req.body.category){
            let existCategory = await CategoryModel.findOne({ where : { id : req.body.category } })
            if (existCategory == null) {
                return NotFoundResponse(res, `Data with category id ${req.body.category} not found`)
            }else{
                data.category = req.body.category
            }
        }

        if(Object.keys(data).length == 0){
            BadRequestResponse(res, "Required minimal 1 data(name, price, category)")
        }

        await ProductModel.update(data , { where : { id : req.params.id } }, { new : true })
        dataExist = await ProductModel.findOne({ where : { id : req.params.id } })
        return SuccessResponse(res, "Success update data ", dataExist)
    },
    delete : async(req, res) => {
        let dataExist = await ProductModel.findOne({ where : { id : req.params.id } })

        if (dataExist == null) {
            return NotFoundResponse(res, `Data with id ${req.params.id} not found`)
        }

        await ProductModel.destroy({ where : { id : req.params.id } })
        return SuccessResponse(res, `Success delete data with id ${req.params.id}`)
    }
}