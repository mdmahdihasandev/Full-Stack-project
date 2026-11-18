let PesentationPage = require('../model/presentatioSchema')

let presentationTodo = async (req,res)=> {

    let {name , id, date, presentatio , homework} = req.body

    if(!name  || !id || !date || !presentatio || !homework){
       return res.status(400).json({
            success: false,
            message : "pleas all the fill"
        })
    }


    await PesentationPage.create({
        name,
        id,
        date,
        presentatio,
        homework
    })

    res.status(200).json({
        succes: true,
        message : "Congratulation Presentation Done"
    })



}

module.exports = presentationTodo