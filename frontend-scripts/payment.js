const algosdk = require('algosdk');
const counterSource = require('./escrow-teal');
const clearSource = require('./clear-teal');
const { encodeAddress, getApplicationAddress } = require('algosdk');
const { Account } = require('algosdk/dist/types/src/client/v2/algod/models/types');


async function payment() {

    try {


        const algosdk = require('algosdk');
        const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
        const port = '';
        const token = { 'X-API-Key': 'pn6FETz0C38epEEifmWBz7kFgaxdaToZ1P12OHgX' }


        const algodClient = new algosdk.Algodv2(token, baseServer, port);
        let params = await algodClient.getTransactionParams().do();

        const senderSeed = "undo panel design trigger hurdle vehicle service pioneer bracket enemy blossom hat never work cattle gift moral evidence pledge same scatter glow slow absent essence";

        let senderAccount = algosdk.mnemonicToSecretKey(senderSeed);
        let sender = senderAccount.addr;
        console.log(sender)

        let escrowID = 89527533 //change this
        let escrowAddress = getApplicationAddress(escrowID);
        let escrowAcc =
            amount = 2000000;



        let payment = algosdk.makePaymentTxnWithSuggestedParams(sender, escrowAcc, amount, undefined, undefined, params);

        let signedTxn = payment.signTxn(senderAccount.sk);


        // Submit the transaction
        let tx = (await algodClient.sendRawTransaction(signedTxn).do());

        let confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
        let transactionResponse = await algodClient.pendingTransactionInformation(tx.txId).do();

        //Get the completed Transaction
        console.log("Transaction " + tx.txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

    }
    catch (err) {
        console.log("err", err);
    }
    process.exit();
};

payment();
