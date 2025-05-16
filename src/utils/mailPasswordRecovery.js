import nmailer from "nodemailer";
import { config } from "../config.js"

const transporter = nmailer.createTransport({
    host : "smtp.gmail.com",
    port : 465,
    auth : {
        user : config.MAIL.USER,
        pass : config.MAIL.PASSWORD 
    },/*
         tls: {
            rejectUnauthorized: false, // ⚠️ Solo usar en desarrollo
        },*/
})

const sendEmail = async (to, subject, body, html) => {
    try {
        const info = await transporter.sendMail({
            from : config.MAIL.USER,
            to,
            subject,
            body,
            html,
        })

        return info;
    } catch (error) {
        console.log(error);
        
    }
};



const HTMLRecoveryEmail = (code) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto:wght@400;700&display=swap');
                body {
                    font-family: 'Roboto', sans-serif;
                    background: linear-gradient(to right, #ff7eb3, #ff758c, #ff6f61);
                    color: #ffffff;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 700px;
                    margin: 50px auto;
                    background: #ffffff;
                    color: #333333;
                    border-radius: 15px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                }
                .header {
                    background: linear-gradient(to right, #6a11cb, #2575fc);
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                    font-family: 'Pacifico', cursive;
                }
                .header h1 {
                    margin: 0;
                    font-size: 36px;
                }
                .content {
                    padding: 30px;
                    text-align: center;
                }
                .content p {
                    font-size: 18px;
                    line-height: 1.6;
                    margin: 20px 0;
                }
                .recovery-code {
                    display: inline-block;
                    padding: 10px 20px;
                    font-size: 28px;
                    font-weight: bold;
                    color: #ffffff;
                    background: linear-gradient(to right, #f53803, #f5d020);
                    border-radius: 50px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }
                .footer {
                    background: #f4f4f4;
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    padding: 15px;
                }
                .footer p {
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>✨ ¡Recupera tu Cuenta! ✨</h1>
                </div>
                <div class="content">
                    <p>Hola,</p>
                    <p>¡Parece que has solicitado un reinicio de contraseña! Aquí tienes tu código de recuperación:</p>
                    <div class="recovery-code">${code}</div>
                    <p>Utilízalo para completar el proceso de recuperación. Si no fuiste tú, puedes ignorar este correo.</p>
                </div>
                <div class="footer">
                    <p>🚀 Este es un correo automático, por favor no respondas. 🚀</p>
                </div>
            </div>
        </body>
        </html>
    `;
};


export {sendEmail, HTMLRecoveryEmail};