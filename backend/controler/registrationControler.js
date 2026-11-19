let Page = require('../model/modelSchema')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: 'mahdihasansojip@gmail.com',
    pass: 'ptqafhhdbddeozna',
  },
});

let contoler = async  (req,res)=> {

    let {name , email , password , terms, confirmpassword} = req.body

    let error = {}

    if(!name){
        error.name = "inter your name"
    }
    if(!email){
        error.email = "inter your email"
    }
    if(!password){
        error.password = "inter your password"
    }

    if(password !== confirmpassword){
        error.confirmpassword = 'password not match'
    }

    if(terms !== true){
        error.terms = "click true false"
    }
  

    if(Object.keys(error).length > 0){
      return  res.status(400).json({
            success: false,
             error
        })
    }

      let exxist = await Page.findOne({email : email})

    if(exxist){
       return res.status(400).json({
            success : false,
            message: 'already email exxist'
        })
    }

    await Page.create({
        name,
        email,
        password,
        terms,
        confirmpassword,
    })


    try {
  const info = await transporter.sendMail({
    from: '"Example Team" <mahdihasansojip@gmail.com>',
    to: email, 
    subject: "Hello", 
    html: "<b>Hello world?</b>", 
  });

  console.log("Message sent: %s", info.messageId);
 
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}

    


    res.status(200).json({
        success: true,
        message : 'congratulatuins'
    })


}
module.exports = contoler