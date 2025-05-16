const aiService = require('../services/ai.service');

module.exports.getReview = async(req, res) => {
    try {
        const code = req.body.code;
        if(!code) {
            return res.status(400).send('Please send code');
        }

        const response = await aiService(code);
        return res.status(200).send(response);
    } catch(e) {
        console.log(e);
        res.status(500).send({ message : e});
    }
    
}