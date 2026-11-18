 let Page = require('../model/modelSchema')
 const nodemailer = require("nodemailer");

 const transporter = nodemailer.createTransport({
  host: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: 'mahdihasansojip@gmail.com',
    pass: process.env.SMTP_PASS,
  },
});

  let logincontroler = async (req,res)=> {

    let {email , password} = req.body

    let error = {}

    if(!email){
        error.email = "pleas inter your email"
    }

    if(!password){
        error.password = "pleas inter your password"
    }

    if(Object.keys(error).length > 0){
       return res.status(400).json({
            success : false,
            error
        })
    }

    let exious = await Page.findOne({email})

    if(!exious){
      return  res.status(400).json({
            success : false,
            message : "email not"
        })
    }

    if(password !== exious.password){
        return res.status(400).json({
            succes: false,
            message: "password rong"
        })
    }

    try {
  const info = await transporter.sendMail({
    from: '"Example Team" <mahdihasansojip@gmail.com>', // sender address
    to: email, // list of recipients
    subject: "Hello", // subject line
    html: "<b>Hello world?</b>", // HTML body
  });

  console.log("Message sent: %s", info.messageId);
  // Preview URL is only available when using an Ethereal test account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
  console.error("Error while sending mail:", err);
}


    res.status(200).json({
        success: true,
        message: "Congratulation Login Done"
    })


}
module.exports = logincontroler