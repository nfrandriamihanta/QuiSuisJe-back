const { MongoClient } = require('mongodb')
const dbName = "QuiSuisJe"
exports.dbName = dbName

exports.getClient = function getClient() {
    const uri = "mongodb+srv://m1mobile:12345@quisuisje.ldb69.mongodb.net/QuiSuisJe?retryWrites=true&w=majority"
    const client = new MongoClient(uri)
    return client
}

exports.listDatabases = async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
    databasesList.databases.forEach(db => {
        console.log(db.name)
    })
}
