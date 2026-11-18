let PesentationPage = require('../model/presentatioSchema')

let presentationalldata = async (req,res)=> {

    let alldata = await PesentationPage.find({})

    res.send(alldata)

}

module.exports = presentationalldata