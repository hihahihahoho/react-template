const dotenv = require('dotenv');
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const ftpConfig = require('./ftp.config')
dotenv.config({ path: '.env.staging' })
const config = {
  ...ftpConfig,
  remoteRoot: `web/${process.env.PUBLIC_URL}`,
  localRoot: __dirname + "/build",
  include: [".*", "**/*"],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: true,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log("Finish uploaded to: ", `https://design.vnpay.vn/${process.env.PUBLIC_URL}`))
  .catch((err) => console.log(err));