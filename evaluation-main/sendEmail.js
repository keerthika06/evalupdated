module.exports = async(email,subject,text) => {
    try{
        const  transporter = nodemailer.createTransport({
            host: process.env.PORT,
            service : process.env.Service,
            port : 587,
            ssecure: true,
            auth: {
                MobileNumber: process.env.MobileNumber,
                MPin : process.env.MPin
            }
        })
        await transportersendmail({
            from : process.env.USER,
            to : email,subject:subject,
            text: text

        })
        console.log('email send sucess')
    }
    catch(error){
        console.log(error,"email not sent")

    }
}
