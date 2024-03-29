import Arweave from "arweave/web";
import CryptoService from "./CryptoService";
import { APP_NAME, APP_VERSION } from "../utils";

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
    const walletAddress = await this.getWalletAddress(wallet);
    const walletBalance = await this.getWalletAmount(walletAddress);
    const walletBalanceAr = this.convertToAr(walletBalance);
    if (walletBalanceAr < 0.01000001) {
      return {
        status: "error",
        msg: "Error: Insufficient balance to send mail",
      };
    }
    var tx = await arweave.createTransaction(
      {
        target: address,
        data: arweave.utils.concatBuffers([content]),
        quantity: tokens,
      },
      wallet
    );

    tx.addTag("App-Name", APP_NAME);
    tx.addTag("App-Version", APP_VERSION);
    tx.addTag("Unix-Time", mailTagUnixTime);
    await arweave.transactions.sign(tx, wallet);
    await arweave.transactions.post(tx);
    return {
      status: "success",
      msg: "Mail sending...",
      id: tx.id
    };
  };

  static sendScreen = async (e, wallet) => {
    //Not required just for testing
    console.log(e.target.files[0]);
    let fileReader = new FileReader();
    fileReader.onloadend = async (e) => {
      const imgBuffer = e.target.result;
      var tx = await arweave.createTransaction(
        { data: new Uint8Array(imgBuffer) },
        wallet
      );
      tx.addTag("Content-Type", "image/svg");
      await arweave.transactions.sign(tx, wallet);
      await arweave.transactions.post(tx);
      console.log(tx);
    };
    fileReader.readAsArrayBuffer(e.target.files[0]);
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
          expr2: APP_NAME,
        },
        expr2: {
          op: "equals",
          expr1: "App-Version",
          expr2: APP_VERSION,
        },
      },
    };

    let get_mail_query_originals = {
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
          expr2: APP_NAME,
        },
        expr2: {
          op: "equals",
          expr1: "App-Version",
          expr2: '0.0.2',
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
          tx_row["unixTime"] = "0";
          tx.get("tags").forEach((tag) => {
            let key = tag.get("name", { decode: true, string: true });
            let value = tag.get("value", { decode: true, string: true });
            if (key === "Unix-Time") tx_row["unixTime"] = value;
          });

          tx_row["id"] = id;
          tx_row["tx_status"] = await arweave.transactions.getStatus(id);
          let from_address = await arweave.wallets.ownerToAddress(tx.owner);
          const from_name = await this.getName(from_address);
          tx_row["from"] = from_name;
          tx_row["from_address"] = from_address;
          tx_row["tx_qty"] = arweave.ar.winstonToAr(tx.quantity);
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

          tx_row["subject"] = JSON.parse(mail.subject).subject;
          tx_row["attachments"] = JSON.parse(mail.subject).attachments;
          try {
            tx_row["body"] = JSON.parse(mail.body);
          } catch (err) {
            const body = [
              {
                type: "paragraph",
                children: [{ text: mail.body }],
              },
            ];
            tx_row["body"] = body;
          }
          return tx_row;
        })
      );
    }


    const resOriginal = await arweave.api.post(`arql`, get_mail_query_originals);

    var tx_rows_original = [];
    if (resOriginal.data === "") {
      tx_rows_original = [];
    } else {
      tx_rows_original = await Promise.all(
        resOriginal.data.map(async (id, i) => {
          let tx_row = {};
          let tx = await arweave.transactions.get(id);
          tx_row["unixTime"] = "0";
          tx.get("tags").forEach((tag) => {
            let key = tag.get("name", { decode: true, string: true });
            let value = tag.get("value", { decode: true, string: true });
            if (key === "Unix-Time") tx_row["unixTime"] = value;
          });

          tx_row["id"] = id;
          tx_row["tx_status"] = await arweave.transactions.getStatus(id);
          let from_address = await arweave.wallets.ownerToAddress(tx.owner);
          const from_name = await this.getName(from_address);
          tx_row["from"] = from_name;
          tx_row["from_address"] = from_address;
          tx_row["tx_qty"] = arweave.ar.winstonToAr(tx.quantity);
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

          console.log(mail)

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
          tx_row["attachments"] = [];
          try {
            tx_row["body"] = JSON.parse(mail.body);
          } catch (err) {
            const body = [
              {
                type: "paragraph",
                children: [{ text: mail.body }],
              },
            ];
            tx_row["body"] = body;
          }
          return tx_row;
        })
      );
    }

    const final_tx_rows = [...tx_rows_original, ...tx_rows]

    final_tx_rows.sort((a, b) => Number(b.unixTime) - Number(a.unixTime));
    return final_tx_rows;
  };

  static refreshOutbox = async (walletAddress) => {
    let get_mail_query = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "from",
        expr2: walletAddress,
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "App-Name",
          expr2: APP_NAME,
        },
        expr2: {
          op: "equals",
          expr1: "App-Version",
          expr2: APP_VERSION,
        },
      },
    };

    let get_mail_query_originals = {
      op: "and",
      expr1: {
        op: "equals",
        expr1: "from",
        expr2: walletAddress,
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "App-Name",
          expr2: APP_NAME,
        },
        expr2: {
          op: "equals",
          expr1: "App-Version",
          expr2: '0.0.2',
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
          tx_row["unixTime"] = "0";
          tx.get("tags").forEach((tag) => {
            let key = tag.get("name", { decode: true, string: true });
            let value = tag.get("value", { decode: true, string: true });
            if (key === "Unix-Time") tx_row["unixTime"] = value;
          });

          tx_row["id"] = id;
          tx_row["tx_status"] = await arweave.transactions.getStatus(id);
          let to_address = await arweave.wallets.ownerToAddress(tx.owner);
          const to_name = await this.getName(to_address);
          tx_row["to"] = to_name;
          tx_row["to_address"] = to_address;
          tx_row["tx_qty"] = arweave.ar.winstonToAr(tx.quantity);
          return tx_row;
        })
      );
    }

    const resOriginal = await arweave.api.post(`arql`, get_mail_query_originals);

    var tx_rows_original = [];
    if (resOriginal.data === "") {
      tx_rows_original = [];
    } else {
      tx_rows_original = await Promise.all(
        resOriginal.data.map(async (id, i) => {
          let tx_row = {};
          let tx = await arweave.transactions.get(id);
          tx_row["unixTime"] = "0";
          tx.get("tags").forEach((tag) => {
            let key = tag.get("name", { decode: true, string: true });
            let value = tag.get("value", { decode: true, string: true });
            if (key === "Unix-Time") tx_row["unixTime"] = value;
          });

          tx_row["id"] = id;
          tx_row["tx_status"] = await arweave.transactions.getStatus(id);
          let to_address = await arweave.wallets.ownerToAddress(tx.owner);
          const to_name = await this.getName(to_address);
          tx_row["to"] = to_name;
          tx_row["to_address"] = to_address;
          tx_row["tx_qty"] = arweave.ar.winstonToAr(tx.quantity);
          return tx_row;
        })
      );
    }

    const final_tx_rows = [...tx_rows, ...tx_rows_original]

    final_tx_rows.sort((a, b) => Number(b.unixTime) - Number(a.unixTime));
    return final_tx_rows;
  };

  static starredMail = async (mailTxId, wallet, walletAddress) => {
    const starredMail = {
      time: Math.round(new Date().getTime() / 1000),
      type: "starred",
      mailTxId,
    };

    const transaction = await arweave.createTransaction(
      {
        data: JSON.stringify(starredMail),
      },
      wallet
    );
    transaction.addTag("Transaction-Type", starredMail.type);
    transaction.addTag("Time", starredMail.time);
    transaction.addTag("Mail-Owner", walletAddress);
    transaction.addTag("App-Name", APP_NAME);
    transaction.addTag("App-Version", APP_VERSION);

    await arweave.transactions.sign(transaction, wallet);
    await arweave.transactions.post(transaction);
    // alert("Mail starred!");
  };

  static getStarredMails = async (walletAddress) => {
    const query = {
      op: "and",
      expr1: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "Transaction-Type",
          expr2: "starred",
        },
        expr2: {
          op: "equals",
          expr1: "Mail-Owner",
          expr2: walletAddress,
        },
      },
      expr2: {
        op: "and",
        expr1: {
          op: "equals",
          expr1: "App-Name",
          expr2: APP_NAME,
        },
        expr2: {
          op: "equals",
          expr1: "App-Version",
          expr2: APP_VERSION,
        },
      },
    };

    const txids = await arweave.arql(query);
    if (txids.length === 0) return [];

    const transactions = await Promise.all(
      txids.map((txid) => arweave.transactions.get(txid))
    );

    const allTransactions = await Promise.all(
      transactions.map(async (transaction, id) => {
        let transactionNew = JSON.parse(
          transaction.get("data", {
            decode: true,
            string: true,
          })
        );
        Object.assign(transactionNew, {
          txid: txids[id],
        });

        return transactionNew;
      })
    );

    return allTransactions;
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

    const tx = await arweave.transactions.get(txs.data[0]);
    return tx.get("data", { decode: true, string: true });
  };
}
