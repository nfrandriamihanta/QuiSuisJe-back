const connect = require('../util/connexion')

exports.findAllTopics = async function findAllTopics() {
    const client = connect.getClient()
    let result = {}
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Topic').find().toArray()
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}


exports.findLessonsByTopic = async function findLessonsByTopic(topic) {
    const client = connect.getClient()
    let result = {}
    try {
        await client.connect()
        result = await client.db(connect.dbName).collection('Topic').findOne(topic)
        console.log(result)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
    return result
}

