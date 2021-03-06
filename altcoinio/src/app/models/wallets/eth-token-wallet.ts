import {
  EthInitiateParams,
  EthParticipateParams,
  EthereumWallet,
  InitiateData,
  ParticipateData,
  RedeemData, RedeemParams,
  TokenFactory, TOKENS, EthRedeemParams, TokenAtomicSwap
} from "altcoinio-wallet";
import {Observable} from "rxjs/Observable";
import {AltcoinioStorage} from "../../common/altcoinio-storage";
import {EthCoinModel} from "../coins/eth-coin.model";
import {Wallet} from "./wallet";

export class EthTokenWallet extends EthereumWallet implements Wallet {
  readonly timeout: number = 7200;
  public token: TOKENS;

  constructor(token: TOKENS) {
    super();
    this.token = token;
  }

  Initiate(address: string, coin: EthCoinModel): Observable<InitiateData> {
    const token = this.getERC20Token(this.token);
    const initParams = this.getInitParams(address, coin.amount.toString());
    return Observable.fromPromise(token.initiate(initParams));
  }

  Participate(data: InitiateData, coin: EthCoinModel): Observable<ParticipateData> {
    // tslint:disable-next-line
    const xprivKey = this.init();

    const token = this.getERC20Token(this.token);

    const secretHash = data.secretHash;
    const participateParams = new EthParticipateParams(this.timeout,
      this.oxify(secretHash),
      data.address,
      coin.amount.toString(), xprivKey);

    return Observable.fromPromise(token.participate(participateParams));
  }

  Redeem(data: RedeemData, coin: EthCoinModel): Observable<RedeemData> {
    this.init();
    const params = new EthRedeemParams(this.oxify(data.secret), this.oxify(data.secretHash), null);
    const token = this.getERC20Token(this.token);
    return Observable.fromPromise(token.redeem(params));
  }

  getInitParams(address: string, amount: string): EthInitiateParams {
    return new EthInitiateParams(this.timeout, address, amount.toString());
  }

  oxify(param: string): string {
    return param.indexOf("0x") === -1 ? "0x" + param : param;
  }

  public init(): string {
    const xprivKey = AltcoinioStorage.get("btcprivkey");
    const keystore = super.recover(xprivKey);
    this.login(keystore);
    return xprivKey;
  }

  public getERC20Token(token: TOKENS): TokenAtomicSwap {
    return TokenFactory.GetToken(token, this.engine);
  }
}
