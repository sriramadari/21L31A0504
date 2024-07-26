const axios = require('axios');

const authService = {
    async getAuthToken() {
        const payload = {
            companyName: "goMart",
            clientID: "a91028a6-68fa-4a9c-9ebd-57d0b123505c",
            clientSecret: "zcmyWQoVFqnwdTMU",
            ownerName: "SriamAdari",
            ownerEmail: "sriramadari.dev@gmail.com",
            rollNo: "21L31A0504"
        };

        const response = await axios.post('http://20.244.56.144/test/auth', payload);
        return response.data.token;
    }
};

module.exports = authService;