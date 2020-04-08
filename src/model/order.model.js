import Sequelize, { STRING } from 'sequelize'
import connection from '../database/connection'

export const attributes = {
    id : {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    name : {
        type : Sequelize.STRING,
        required : true
    },
    address : {
        type : Sequelize.TEXT,
        required : true
    },
    status : {
        type : Sequelize.TINYINT,
        defaultValue : 0
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

export const tableName = 'orders'
export default connection.define(tableName, attributes, { tableName })