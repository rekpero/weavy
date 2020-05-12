import Arweave from "arweave/web";
import CryptoService from "./CryptoService";

export const arweave = Arweave.init({
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

  static convertToWinston = (amount) => {
    return arweave.ar.arToWinston(amount);
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

  static sendMail = async (
    address,
    tokens,
    content,
    wallet,
    mailTagUnixTime
  ) => {
    console.log(address, tokens, content, wallet, mailTagUnixTime);
    var tx = await arweave.createTransaction(
      {
        target: address,
        data: arweave.utils.concatBuffers([content]),
        quantity: tokens,
      },
      wallet
    );

    tx.addTag("App-Name", "weave-mail-revamp");
    tx.addTag("App-Version", "v0.0.0beta1");
    tx.addTag("Unix-Time", mailTagUnixTime);
    await arweave.transactions.sign(tx, wallet);
    console.log(tx.id);
    await arweave.transactions.post(tx);
    alert("Mail dispatched!");
  };

  static refreshInbox = async (wallet) => {
    var address = await arweave.wallets.jwkToAddress(wallet);

    let get_mail_query = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "to",
        expr2: address,
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "App-Name",
          expr2: "weave-mail-revamp",
        },
        expr2: {
          op: "equals",
          expr1: "App-Version",
          expr2: "v0.0.0beta1",
        },
      },
    };

    const res = await arweave.api.post(`arql`, get_mail_query);

    var tx_rows = [];
    if (res.data === "") {
      tx_rows = [];
    } else {
      tx_rows = await Promise.all(
        res.data.map(async (id, i) => {
          let tx_row = {};
          let tx = await arweave.transactions.get(id);
          console.log(tx);
          tx_row["unixTime"] = "0";
          tx.get("tags").forEach((tag) => {
            let key = tag.get("name", { decode: true, string: true });
            let value = tag.get("value", { decode: true, string: true });
            if (key === "Unix-Time") tx_row["unixTime"] = value;
          });
          console.log(tx_row);

          tx_row["id"] = id;
          tx_row["tx_status"] = await arweave.transactions.getStatus(id);
          let from_address = await arweave.wallets.ownerToAddress(tx.owner);
          console.log(tx_row);
          tx_row["from"] = await this.getName(from_address);
          console.log(tx_row);
          tx_row["tx_qty"] = arweave.ar.winstonToAr(tx.quantity);
          console.log(tx_row);
          let key = await CryptoService.wallet_to_key(wallet);
          let mail = arweave.utils.bufferToString(
            await CryptoService.decrypt_mail(
              arweave.utils.b64UrlToBuffer(tx.data),
              key
            )
          );
          try {
            mail = JSON.parse(mail);
          } catch (e) {
            console.log(e);
          }

          // Upgrade old format.
          if (typeof mail === "string") {
            mail = {
              body: mail,
              subject: id,
            };
          }

          // Validate
          if (
            typeof mail !== "object" ||
            typeof mail.body !== "string" ||
            typeof mail.subject !== "string"
          ) {
            console.error(mail);
            throw new Error(`Unexpected mail format: ${mail}`);
          }

          tx_row["subject"] = mail.subject;
          tx_row["body"] = JSON.parse(mail.body);
          return tx_row;
        })
      );
    }

    tx_rows.sort((a, b) => Number(b.unixTime) - Number(a.unixTime));
    return tx_rows;
  };

  static getName = async (addr) => {
    let get_name_query = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "App-Name",
        expr2: "arweave-id",
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "from",
          expr2: addr,
        },
        expr2: {
          op: "equals",
          expr1: "Type",
          expr2: "name",
        },
      },
    };

    const txs = await arweave.api.post(`arql`, get_name_query);

    if (txs.data.length === 0) return addr;

    const tx = await this.arweave.transactions.get(txs.data[0]);

    return tx.get("data", { decode: true, string: true });
  };
}
