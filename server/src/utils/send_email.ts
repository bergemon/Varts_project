const nodemailer = require('nodemailer')
import { google } from 'googleapis'

const OAuth2 = google.auth.OAuth2

const OAuth2_client = new OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)
OAuth2_client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

const send_email = async (mail_to: String, subject: String, code: String) =>
{
    try
    {
        const access_token = OAuth2_client.getAccessToken()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.GOOGLE_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: access_token
            }
        })

        await transporter.sendMail({
            from: 'YOUR_EMAIL_ADDRESS',
            to: mail_to,
            subject: subject,
            html: code
        })
    }
    catch (error)
    {
        console.error('Error sending message:', error)
    }
}

export default send_email