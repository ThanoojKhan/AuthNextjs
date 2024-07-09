import User from '@/models/userModel'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken, verifyTokenExpiry:
                        Date.now() + 3600000
                })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken, forgotPasswordExpiry:
                        Date.now() + 3600000
                })

        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.NODEMAILER_USER!,
                pass: process.env.NODEMAILER_PASS!
            }
        });
        const mailOptions = {
            from: "shibildas@gmail.com",
            to: email,
            subjecy: emailType === "VERIFY" ? 'Verify your E-mail' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to
            ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`
        }
        const mailresult = await transport.sendMail(mailOptions)
        return mailresult
    } catch (error: any) {
        throw new Error(error.message)
    }

}