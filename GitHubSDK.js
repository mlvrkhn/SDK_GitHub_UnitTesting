const { log } = require("console");

const myToken = '82a95f5e8ca944aac848eecffda7d212bb5b2c5e';


export default class GitHubSDK {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
    sendInvitation() {
        console.log('invo', name, surname);
    }
}

// module.exports = { 
//     GitHubSDK
// }