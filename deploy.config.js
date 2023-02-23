const dotenv = require('dotenv');
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
const ftpConfig = require('./ftp.config.js')
dotenv.config({ path: '.env.design' })
const config = {
	...ftpConfig,
	remoteRoot: process.env.PUBLIC_SITE_DIR,
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
	.then((res) => console.log(`Finish uploaded to: ${process.env.PUBLIC_SITE_NAME}/${process.env.PUBLIC_SITE_DIR}`))
	.catch((err) => console.log(err));