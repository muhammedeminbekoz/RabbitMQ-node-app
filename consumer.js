const rabbitmqConnection = require('./rabbitmqConnection')
const queueName = process.argv[2] || "jobsQueue"



const consumer = async () => {
    try {
        const connection = await rabbitmqConnection()
        const channel = await connection.createChannel()
        await channel.assertQueue(queueName)

        //Mesajın alınması
        console.log("mesaj Bekleniyor")
        channel.consume(queueName, (message) => {
            const massageInfo = JSON.parse(message.content.toString())
            console.log("id: ", massageInfo.description.id)
            channel.ack(message)

        })

    }
    catch (err) {
        console.log("Hata: ", err)
    }
}

consumer();

module.exports = {
    consumer
}