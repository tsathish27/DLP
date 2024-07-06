// const nodemailer = require('nodemailer');

// async function sendResetLink(email, resetToken) {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'eclairstelugufilms@gmail.com', // Replace with your email
//             pass: 'Sathishvarun@27'   // Replace with your email password
//         }
//     });

//     const mailOptions = {
//         from: 'elairstelugufilms@gmail.com',
//         to: email,
//         subject: 'Password Reset Request',
//         text: `You requested a password reset. Please click the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Reset link sent');
//     } catch (error) {
//         console.error('Error sending reset link:', error);
//     }
// }

// module.exports = sendResetLink;

const nodemailer = require('nodemailer');

const sendResetLink = async (email, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'elairstelugufilms@gmail.com', // Your email address
            pass: 'Sathishvarun@05' // Your email password or app password
        }
    });

    const mailOptions = {
        from: 'elairstelugufilms@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Please use the following link to reset your password: http://localhost:3000/reset-password?token=${resetToken}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Reset link sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

module.exports = sendResetLink;
