export default class Order {
  public market: string

  constructor(market: string ) {
    this.market = market

  }

  public toJSON() {
    return {

    }
  }

  public fromJSON() {
    this.market = 'market'
  }

}
