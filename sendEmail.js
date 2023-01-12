import nodemailer from 'nodemailer';

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    host :"assent.herosite.pro",
    port: 587,
    auth: {
      user: "orionmarketing@biztekminds.com", // email
      pass: "Techguru1234", //password
    },
  });
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

// send email
const EmailSender = ({ orderItems, shippingAddress}) => {
  const options = {
    from: "orionmarketing@biztekminds.com",
    to: "ds86731@gmail.com",
    subject: 'Message From Orion Marketing',
    html: `
        <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
          <div style="width: 100%; background-color: #00efbc; padding: 20px 0">
          <a href="${"https://orionmarketing.onrender.com"}" ><img
              src="https://res.cloudinary.com/zpune/image/upload/v1652256707/random/favicon_hybtfj.png"
              style="width: 100%; height: 70px; object-fit: contain"
            /></a> 
          
          </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              Form Orion Marketing
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>orderItems: <b>${orderItems}</b></p>
              <p>shippingAddress: <b>${shippingAddress}</b></p>
           
            </div>
          </div>
        </div>
      </div>
        `,
  };

  Email(options)
};

export default EmailSender
