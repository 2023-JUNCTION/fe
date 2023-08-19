import TransportBase from './TransportBase';

type OrdersRequestType = {
  orders: {
    id: number;
    count: number;
  }[];
  elsImage: string;
};
class Test extends TransportBase {
  public constructor() {
    super('api');
  }

  public postOrders({ orders, elsImage }: OrdersRequestType): Promise<unknown> {
    return this.http
      .post('/orders', {
        orders,
        elsImage,
      })
      .then(TransportBase.handleResponse)
      .catch(TransportBase.handleError);
  }
}

export default new Test();
