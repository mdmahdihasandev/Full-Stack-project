let PresentatioPage = require('../model/presentatioSchema')

let presentationupdate = async (req,res)=> {

    let { id } = req.params

   let dataupdate = await PresentatioPage.findByIdAndUpdate({_id : id}, req.body, {new : true })

    res.send(dataupdate)

}

module.exports = presentationupdate