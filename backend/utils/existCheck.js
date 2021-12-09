const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const checkPhoneExist = async (phoneData) => {
    console.log('find start', phoneData);

    const result = await prisma.phones.findUnique({
        where: {
            code_phone: {
                code: phoneData.code,
                phone: phoneData.phone,
            },
        }
    });
    return result;
};

module.exports.checkPhoneExist = checkPhoneExist;