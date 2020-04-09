import CategoryModel from '../model/category.model'
import ProductModel from '../model/product.model'
import OrderModel from '../model/order.model'
import OrderItemModel from '../model/orderItem.model'
import sequelize from '../database/connection'
import { BadRequestResponse, SuccessResponse, CreatedResponse, NotFoundResponse, ServerErrorResponse } from '../lib/responses'
import promise from 'bluebird'

export default {
    getAll : async(req, res) => {
        let page = req.query.page || 1
        let perpage = req.query.perpage || 10

        let ordersPerpage = await OrderModel
        .findAll({
            skip : page * perpage - perpage,
            limit : perpage
        })

        for (let index = 0; index < ordersPerpage.length; index++) {
            ordersPerpage[index] = await addItems(ordersPerpage[index])
        }

        let orders = await OrderModel.findAndCountAll()

        let data = {
            page,
            perpage,
            total : orders.count,
            orders : ordersPerpage
        }

        SuccessResponse(res, "Success get orders", data)
    },
    getById : async(req, res) => {
        let detail = await OrderModel.findOne({ where : { id : req.params.id } })

        if (detail == null) {
            return NotFoundResponse(res, `Data with id ${req.params.id} not found`)
        }

        detail = await addItems(detail)
        
        return SuccessResponse(res, "Success get detail data ", detail)
    },
    create : async(req, res) => {
        if(!req.body.name || !req.body.address || !req.body.items){
            return BadRequestResponse(res, "Required name, address and items")
        }

        if(typeof(req.body.items) != "object"){
            return BadRequestResponse(res, "Items must an array")
        }

        let dataOrder = {
            name : req.body.name,
            address : req.body.address,
            status : 0
        }

        let transaction
        try {
            transaction = await sequelize.transaction()

            let order = await OrderModel.create(dataOrder, { transaction })

            for (let i = 0; i < req.body.items.length; i++) {

                let dataExist = await ProductModel.findOne({ where : { id : req.body.items[i].productId } })
                if (dataExist == null) {
                    throw new Error("Product not found")
                }

                let dataItem = {
                    orderId : order.id,
                    productId : req.body.items[i].productId
                }

                req.body.items[i].note ? dataItem.note = req.body.items[i].note : null
                
                await OrderItemModel.create(dataItem, { transaction })
            }

            await transaction.commit()
            order = await addItems(order)

            return CreatedResponse(res, "Success create order", order)
        } catch (error) {
            if (transaction) await transaction.rollback()
            console.log(error);
            return ServerErrorResponse(res, "Some error was happen in server. Please check your send data.", error)
        }


    },
    update : async(req, res) => {
        if(!req.body.status){
            return BadRequestResponse(res, "Required status")
        }

        let data = {
            status : req.body.status
        }

        await OrderModel.update(data , { where : { id : req.params.id } }, { new : true })
        let dataExist = await OrderModel.findOne({ where : { id : req.params.id } })
        dataExist = await addItems(dataExist)
        return SuccessResponse(res, "Success update data ", dataExist)
    }
}

function addItems(order) {
    return new promise(async(resolve, reject) => {
        let items = await OrderItemModel.findAll({ where : { orderId : order.id }, attributes : { exclude : ["orderId, updatedAt"] } })
        resolve({
            id : order.id,
            name : order.name,
            address : order.address,
            status : order.status,
            createAt : order.createAt,
            items
        })
    })
}