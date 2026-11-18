let PresentatioPage = require('../model/presentatioSchema')

let presentationdelete = async (req,res)=> {

    let {id} = req.params

   let deletedata = await PresentatioPage.findByIdAndDelete(id)

   res.send(deletedata)

}

module.exports = presentationdelete