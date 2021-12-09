const express = require('express');
const { PrismaClient } = require('@prisma/client')
const { checkPhoneExist } = require('./utils/existCheck')
const { validate } = require('./utils/validate')

const PORT = process.env.PORT || 3001;

const prisma = new PrismaClient();

const app = express();

const WSServer = require('express-ws')(app)

let aWss = WSServer.getWss('/');

app.ws('/', async (ws, req) => {
    console.log('ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО');

    ws.on('message', async function (message) {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                let isValid = validate(message);
                let isExistPhone = await checkPhoneExist(message);

                if (!isExistPhone && isValid) {
                    let newPhone = await prisma.phones.create({
                        data: {
                            code: message.code,
                            phone: message.phone,
                        },
                    });
                }
                const many = await prisma.phones.findMany({});

                broadcastMessage(many)
                break;
            case 'connection':
                const all = await prisma.phones.findMany({});
                broadcastMessage(all)
                break;
        }
    });
})

app.listen(PORT, () => console.log(`server start on PORT ${PORT}`))

function broadcastMessage (message) {
    aWss.clients.forEach(function (client) {
        client.send(JSON.stringify(message))
    })
}

