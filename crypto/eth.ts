import Web3 from "web3";
import { Transaction } from "ethereumjs-tx";
import axios from "axios";

const ethNetwork =
  "wss://rinkeby.infura.io/ws/v3/10e7097fb8574a6d8939989217444af4";
const web3 = new Web3(new Web3.providers.WebsocketProvider(ethNetwork));
/* const client = new Client({
  apiKey: "NiOQ7Ifg4LrSqhf5",
  apiSecret: "9nyHHPuB0xBFC2laTBsVL3Shqzxs4V4a",
}); */

const buyerAddress = "0x25DcA9741FbC056e83FA5d8116a2d7e4e9fe70ca";
const escrowAddress = "0xe557E2C339737006086e8f073C3040C5f8288E26";
const pk1 =
  "0xb274b5c057b55722c84d56c51850841422d4e5bcfa33a358cedcb8d32b2f43d9";

const transferFund = async (
  sendersData: { address: string; privateKey: string },
  recieverData: { address: string },
  amountToSend: number
) => {
  const nonce = await web3.eth.getTransactionCount(sendersData.address);
  const balance = parseInt(
    web3.utils.fromWei(await getBalance(sendersData.address), "ether")
  );
  if (balance < amountToSend) {
    console.log("insufficient funds");
    return;
  }

  const gasPrices = await getCurrentGasPrices();
  const details = {
    to: recieverData.address,
    value: web3.utils.toHex(web3.utils.toWei(amountToSend.toString(), "ether")),
    gas: 21000,
    gasPrice: gasPrices.low * 1000000000,
    nonce,
    chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
  };

  const transaction = new Transaction(details, { chain: "rinkeby" });
  const privateKey = sendersData.privateKey.split("0x");
  const privKey = Buffer.from(privateKey[1], "hex");
  transaction.sign(privKey);

  const serializedTransaction = transaction.serialize();

  const { transactionHash } = await web3.eth.sendSignedTransaction(
    "0x" + serializedTransaction.toString("hex")
  );
  const url = `https://rinkeby.etherscan.io/tx/${transactionHash}`;
  console.log(url);
  return { id: transactionHash, link: url };
};

const getCurrentGasPrices = async () => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  return {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10,
  };
};

const getBalance = async (address: string) => {
  return await web3.eth.getBalance(address);
};

/* transferFund(
  {
    address: buyerAddress,
    privateKey: pk1,
  },
  { address: escrowAddress },
  0.01
);
 */

const SECRET_KEY =
  "oyfbo2vCrDWQ0Ls05mk4N6EYk2rkfs68FQntV4RkLyNgXvZpli1BtXe4QZEkto59";

/* let tokens = Tokens;
tokens.merchant = "AdsBgKAHzQTE8geuC3jg4TPivcbLsiic69SAsZSoKSWk";

let client = new Client(null, Env.Test, [], tokens); */

const createInvoice = async () => {
  /* const invoice = await axios.get(
    `https://plisio.net/api/v1/invoices/new?source_currency=USD&source_amount=2&order_number=2&currency=BTC&email=adulorier@gmail.com&order_name=btc2&callback_url=http://test.com/callback&api_key=${SECRET_KEY}`
  );
  console.log(invoice); */
  const result = await axios.post("https://test.bitpay.com/invoices", {
    price: 0.01,
    currency: "ETH",
    token: "3wgCZQQEsZFi8FwmRhjVvn34Lbf8DAnjSG12pCub6oXj",
    paymentCurrencies: ["ETH"],
    notificationURL: "https://merchantwebsite.com/shop/notifications",
    redirectURL: "https://merchantwebsite.com/shop/return",
    buyer: {
      email: "john@doe.com",
    },
  });
  console.log(result);
};

createInvoice();
