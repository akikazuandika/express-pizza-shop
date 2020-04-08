import Sequelize, { STRING } from 'sequelize'
import connection from '../database/connection'

export const attributes = {
    id : {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    orderId : {
        type : Sequelize.INTEGER,
        required : true
    },
    productId : {
        type : Sequelize.INTEGER,
        required : true
    },
    amount : {
        type : Sequelize.TINYINT,
        defaultValue : 0
    },
    note : {
        type : Sequelize.TEXT
    },
    createdAt : {
        type : Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt : {
        type : Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}

export const tableName = 'order_items'
export default connection.define(tableName, attributes, { tableName })