import Sequelize, { STRING } from 'sequelize'
import connection from '../database/connection'

export const attributes = {
    id : {
        type : Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement : true
    },
    name : {
        type : Sequelize.STRING
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

export const tableName = 'categories'
export default connection.define(tableName, attributes, { tableName })