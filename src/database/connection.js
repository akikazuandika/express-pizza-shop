import Sequelize from 'sequelize'
import { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } from '../config/config'

const connection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host : DB_HOST,
    dialect : 'mysql'
})

connection
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

export default connection;