const amqp = require('amqplib')
const rabbitmqConnection = require('./rabbitmqConnection')
const data = require('./data.json')
const queueName = process.argv[2] || "jobsQueue"
console.log("qu", queueName)

const message = {
    description: "test message",
    content: "herkese merebe"
}

const publisher = async () => {
    try {
        const connection = await rabbitmqConnection()
        const channel = await connection.createChannel()
        await channel.assertQueue(queueName)

        data.map(i => {
            message.description = i
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
            console.log("gönderilen mesaj", message)
        })



        // ==================================================SetInterval=======================================================
        /* setInterval(() => {
            message.description = new Date().getTime()
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)))
            console.log(message, 'kuyruğa gitti')
        }, 10) */
        // ==================================================SetInterval=======================================================

    }
    catch (err) {
        console.log("Hata: ", err)
    }
}

publisher();

module.exports = {
    publisher
}