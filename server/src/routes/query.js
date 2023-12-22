import { Router } from "express";

const QueryRouter = Router();

/**
 * Connects to the database based on the passed credentials then returns status with the proper code
 * 200 -> success
 * 403 -> Forbidden
 *  
 * (POST) /query/connect
 * @returns {status} 
 */

QueryRouter.post('/connect', async (req, res) => {
    const {host, user, password, database} = req.body.database;

    try {
        await req.dbInstance.getInstance({host, user, password, database});
        res.status(200).json({status: 'success'});
    } catch (e) {
        res.status(403).json({status: 'failed'});
    }
});

/**
 * Disconnect from the database then returns status with the proper code if there was a connection
 * 200 -> success
 * 400 -> Bad request
 *  
 * (POST) /query/disconnect
 * @returns {status} 
 */
QueryRouter.post('/disconnect', async (req, res) => {
    try {
        if(req.dbInstance.connection) {
            await req.dbInstance.connection.close();
            req.dbInstance.connection = null;
            res.status(200).json({status: 'success'});
        } else {
            res.status(400).json({status: 'failed'});
        }
    } catch (e) {
        res.status(400).json({status: 'failed'});
    }
});


/**
 * Executes query based on the passed query parameter
 * 200 -> success
 * 403 -> Forbidden
 *  
 * (GET) /query
 * @returns {status | rows} 
 */
QueryRouter.get('/', async (req, res) => {
    try {
        const {query = null} = req.query;
        if(req.dbInstance.connection && query) {
            const result = await req.dbInstance.connection.query(query);
            res.status(200).json({result: result[0]});
        } else {
            res.status(403).json({status: 'failed'});
        }
    } catch (e) {
        console.log(e);
        res.status(403).json({status: 'failed', error: {code: e.code, message: e.message}});
    }
});

export default QueryRouter;