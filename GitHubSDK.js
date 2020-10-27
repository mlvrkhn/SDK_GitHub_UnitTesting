// const { log } = require("console");
const token = '82a95f5e8ca944aac848eecffda7d212bb5b2c5e'
// const token = {
//     'X-API-Key': '82a95f5e8ca944aac848eecffda7d212bb5b2c5e'
// }

export default class GitHubSDK {
    constructor(root, token = '') {
        this.username = 'mlvrkhn';
        this.root = root;
        this.token = token;
    }
    async getUserData() {
        // const response = await fetch(`https://api.github.com/users/${this.username}`, {
        //     method: 'GET',
        //     headers: {
        //         Acccept: 'application/nvd.github.v3+json',
        //         username: this.username,
        //     }
        // })
        const response = await fetch(`${this.root}/${this.username}`)
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }






    // async sendInvitation() {
    //     const response = await fetch(`https://api.github.com\/users/${this.username}/repos`)
    //     response
    //         .then(resp => resp.json())
    //         .then(data => console.log(data)) 
    //         .catch(err => console.log(err));
    // }
}

// export.modules = {
//     GitHubSDK
// }