import {Coin} from "./coin.model";
import {Coins} from "./coins.enum";
import {Observable} from "rxjs/Observable";
import { WalletRecord } from "../../reducers/balance.reducer";
import {TOKENS} from "altcoinio-wallet";
import {EthWallet} from "../wallets/eth-wallet";
import {AltcoinioStorage} from "../../common/altcoinio-storage";

export class SaltCoinModel implements Coin {
  readonly type: Coins = Coins.SALT;
  readonly derive: string = "ETH";
  readonly name: string = Coins[Coins.SALT].toString();
  readonly fullName: string = "SALT";
  readonly icon: string = "assets/icon/salt-icon.png";
  amount;
  faucetLoading: boolean = false;
  $amountUSD: Observable<number>;
  walletRecord: WalletRecord;

  constructor() {
  }

  update(coin: SaltCoinModel): SaltCoinModel {
    const model = new SaltCoinModel();
    model.amount = coin ? coin.amount : 0;
    return model;
  }

  getTokens(){
    const ethCoinModel = new EthWallet();
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = ethCoinModel.recover(xprivKey);
    ethCoinModel.login(keystore);
    const token = ethCoinModel.getERC20Token(TOKENS.SALT);
    return token.faucet();
  }
}
