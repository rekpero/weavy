const IPFS = require("ipfs-api");
const ipfs = IPFS("ipfs.infura.io", "5001", { protocol: "https" });

export default class IPFSService {
    static uploadAttachment = async (fileBuffer) => {
        var fileBuffer = Buffer.from(fileBuffer);
        console.log(fileBuffer);
        const ipfsHash = await ipfs.files.add(fileBuffer);
        return ipfsHash[0].hash;
    }
}