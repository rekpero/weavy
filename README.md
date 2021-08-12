# weavy.

weavy is a prototype decentralized mail system, running on the [Arweave network](https://arweave.org/), according to the [Weavemail](https://github.com/ArweaveTeam/weavemail#how-is-it-built) protocol specifications, built during [New York Blockchain Week](https://gitcoin.co/hackathon/new-york-blockchain-week/).

It is deployed to the Arweave permaweb, so its messages and the web app itself are *permanent* and *always* available.

## How is it built?

weavy uses the [Arweave HTTP API](https://docs.arweave.org/developers/server/http-api), [Arweave JS](https://github.com/ArweaveTeam/arweave-js), and is deployed with [Arweave Deploy](https://github.com/ArweaveTeam/arweave-deploy).

Speaking to its technical implementation, it makes extensive use of `sessionStorage` capabilities (for temporary storage of keyfiles and drafts) and context and reducers for mail-client application-level routing and app global state change. 

weavy offers an enhanced experience over the [original Weavemail protocol implementation](https://github.com/ArweaveTeam/weavemail), by offering a variety of new features, including:
1. Simplified, familiar UI/UX
2. Session-based keyfile storage
3. More markdown element rich message bodies.
4. Mail with Attachments
5. Session-based mail drafts.
6. Star Mail and a separate starred box for viewing
7. Mail Outbox for viewing sent mails
8. Mobile-responsiveness (except landing page).
9. Integrated Notifications with a mail sent watcher that let user know when the mail is mined
10. Integrated ArweaveId
11. Backward compatibility with the original weavemail version
12. Add caching of all mails

## How does it work?

*Sending messages*
1. Messages are encrypted with the recipients public key using [RSA-OAEP](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding).
2. After encrypting the message contents for the recipient, messages are packaged into an Arweave transaction, signed, tagged, and submitted to the network.
3. For attaching file, I have uploaded the file to ipfs and put the hash along with subject and encrypt the stringified version of object.

*Receiving messages*
1. ArQL is used to collect messages from the network. The query asks for transactions that are a) addressed to you and b) tagged with `App-Name: permamail`.
2. When you click on a message to view it, the transaction is pulled from the network and decrypted using your private key.

## Live
weavy. is live at [https://arweave.net/ojhOYPNfn8OmJmPtzu_cbQqds0avWH-Ilbr4ypAr8kE](https://arweave.net/ojhOYPNfn8OmJmPtzu_cbQqds0avWH-Ilbr4ypAr8kE)

## Additional info
* [Arweave.org](https://arweave.org)
* [Weavemail](https://github.com/ArweaveTeam/weavemail)

## Credits
Special credits to [@Anish-Agnihotri](https://github.com/Anish-Agnihotri), Great work with the landing page content and app too tbh 🚀

Test 14
