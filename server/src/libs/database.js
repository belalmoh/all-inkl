import mysql from 'mysql2/promise';

/**
 * Implementation of the singleton database connection
 */

export default class Database {

    constructor() {
        this.connection = null;
    }

    /**
     * Creates a new database instance if there is no previous instance, otherwise, returns the current one
     * @param {object: {username, host, password, database}} credentials
     * @returns connection
     */
    async getInstance(credentials) {
        if(this.connection) {
            return this.connection;
        }

        this.connection = await mysql.createConnection(credentials);
    }

    /**
     * Executes the passed query string to the mysql
     * @param {string} sql 
     * @returns {Promise} mysqlResult
     */
    query(sql) {
        return this.connection.query(sql);
    }

    /**
     * Closes the connection with the mysql
     * @returns {Promise} mysqlResult
     */
    close() {
        return this.connection.end();
    }
}