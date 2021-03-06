const nodemailer = require('nodemailer')

function sendEmail(sender, senderPass, receiver, userData) {

    // Получаем элементы отправленных данных
    let { name, email, phone, company, question, appName } = userData

    let mailMessage

    if (!question) {
        question = 'not specified by user'
    }

    if (!name) {
        name = 'not specified by user'
    }

    if (!phone) {
        phone = 'not specified by user'
    }

    if (!company) {
        company = 'not specified by user'
    }

    // Проверка на наличие спецсимволов HTML (пример: Roga&copyta "&copy")
    if (company.includes('&')) {
        company = company.replace(/&/g, '&amp;')
    }

    // base mail message
    if (appName === "Avtelma") {
        mailMessage = `
        <hr>
        <h4>Question sent from:</h4>
        <ul>  
            <li>${appName}</li>
        </ul>
        <h4>Contact details:</h4>
        <ul>  
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Phone: ${phone}</li>
            <li>Company name: ${company}</li>
        </ul>
        <h4>Question:</h4>
        <ul>  
            <li>${question}</li>
        </ul>
        <hr>
    `
    } else {
        mailMessage = `
            <hr>
            <h4>Question sent from:</h4>
            <ul>  
                <li>${appName}</li>
            </ul>
            <h4>Contact details:</h4>
            <ul>  
                <li>Name: ${name}</li>
                <li>Email: ${email}</li>
            </ul>
            <h4>Question:</h4>
            <ul>  
                <li>${question}</li>
            </ul>
            <hr>
        `
    }


    // open smtp channel
    const smtpTransport = nodemailer.createTransport({
        host: 'mail.nic.ru',
        // host: 'smtp.mail.ru',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: sender,
            pass: senderPass,
        },
    })

    // mail settings
    let mailOptions = {
        from: sender, // sender address
        to: receiver, // list of receivers
        subject: `Заявка от ${name} `, // Subject line
        html: mailMessage, // html body
    }

    // send mail
    smtpTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('ErrorSendMail: ' + error)
        } else {
            console.log('------------ MESSAGE SENT ------------')
            console.log(info)
            console.log('--------------------------------------')
        }
    })
}

module.exports = sendEmail
