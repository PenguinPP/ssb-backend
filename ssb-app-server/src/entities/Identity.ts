export interface IIdentity {
  low: number;
  high: number;
}

class Identity implements IIdentity {
  public low: number;
  public high: number;

  constructor(identity: IIdentity) {
    this.low = identity.low;
    this.high = identity.high;
  }
}

export default Identity;
