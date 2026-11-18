let mongoose = require('mongoose')
async function configdata(){
    await mongoose.connect(process.env.MONGODB_URL).then(()=> {
    console.log('connected!');
    
})

}

module.exports = configdata