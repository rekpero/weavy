import Arweave from "arweave/web";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

export default class ArweaveService {
  static getWalletAddress = (wallet) => {
    return arweave.wallets.jwkToAddress(wallet);
  };

  static getWalletAmount = (address) => {
    return arweave.wallets.getBalance(address);
  };

  static convertToAr = (amount) => {
    return arweave.ar.winstonToAr(amount);
  };

  static getTxStatus = async (txIds) => {
    const getAllStatus = await Promise.all(
      txIds.map((txId) => this.fetchStatus(txId))
    );
    return getAllStatus;
  };

  static fetchStatus = async (txId) => {
    const res = await fetch(`https://arweave.net/tx/${txId}/status`)
      .then((data) => data.json())
      .catch((err) => console.log(err));
    return res;
  };
}
