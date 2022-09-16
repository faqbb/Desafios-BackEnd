import {faker} from '@faker-js/faker'

const getRandomMessages = (quantity) => {
    let messages = []
    for(let i = 1; i <= quantity; i++) {
        let message = {
            author: {
                id: faker.internet.exampleEmail(),
                name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                age: faker.datatype.number({ min: 18, max: 60}),
                alias: faker.internet.userName(),
                avatar: faker.internet.avatar(),
            },
            text: faker.lorem.lines()
        }
        messages.push(message)
    }
    return messages
}

export default getRandomMessages