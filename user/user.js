const { param } = require('express/lib/request')
const res = require('express/lib/response')
const connect = require('../util/connexion')
const token = require('../util/token')

async function test() {
    const client = connect.getClient()
    try {
        await client.connect()
        await connect.listDatabases(client)
    } catch (e) {

    } finally {
        client.close()
    }
}

exports.signIn = async function signIn(user) {
    const client = connect.getClient()
    date = null
    let result = {}
    try {
        await client.connect()
        user.password = token.hashPwd(user.password)
        result = await client.db(connect.dbName).collection('User').findOne(user)
        if (result) {
            date = Date()
            resp = await client.db(connect.dbName).collection('User').updateOne({
                "identifier": result.identifier,
                "password": result.password
            }, { $set: result })
        }
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

//param => new topic and username
exports.suggestTopic = async function suggestTopic(param) {
    const client = connect.getClient()
    let result = {}
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('User').updateOne({
            "identifier": param.identifier,
        }, { $set: param })
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

async function isEvalExists(param) {
    const client = connect.getClient()
    let result = {}
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Evaluation').findOne(param)
        if (result) {
            return true;
        }
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return false
}

exports.submitEval = async function submitEval(param) {
    const client = connect.getClient()
    let result = {}
    try {
        await client.connect()
        if (!await isEvalExists({
            "identifier": param.identifier,
            "topic": param.topic
        })) {
            result = await client.db(connect.dbName).collection('Evaluation').insertOne(param)
        } else {
            result = await client.db(connect.dbName).collection('Evaluation').updateOne({
                "identifier": param.identifier,
                "topic": param.topic
            }, { $set: param })
        }
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

exports.findAllResultsByUser = async function findAllResultsByUser(user) {
    const client = connect.getClient()
    let result = {}
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Evaluation').find(user).toArray()
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

exports.getCorrection = async function getCorrection(param) {
    const client = connect.getClient()
    let result = {}
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Evaluation').findOne(param)
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}




