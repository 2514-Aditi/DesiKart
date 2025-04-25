const StellarSdk = require('stellar-sdk');

// Function to send payment
async function makePayment(senderSecret, receiverPublic, amount) {
  const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
  const senderKeypair = StellarSdk.Keypair.fromSecret(senderSecret);

  try {
    // Load sender's account
    const senderAccount = await server.loadAccount(senderKeypair.publicKey());
    console.log('Sender account loaded:', senderAccount.accountId());

    // Build the transaction
    const transaction = new StellarSdk.TransactionBuilder(senderAccount, {
      fee: await server.fetchBaseFee(),
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: receiverPublic,
          asset: StellarSdk.Asset.native(), // XLM
          amount: amount.toString(),
        })
      )
      .setTimeout(30)
      .build();

    // Sign the transaction
    transaction.sign(senderKeypair);

    // Submit the transaction
    const result = await server.submitTransaction(transaction);
    console.log('Transaction successful:', result);
    return result;
  } catch (error) {
    console.error('Error during Stellar payment:', error.response?.data || error.message || error);
    throw error;
  }
}

module.exports = { makePayment };
