import TransportBase from './TransportBase';

type OrdersRequestType = {
  menus: {
    id: number;
    count: number;
  }[];
  eslImage: string;
};
class Test extends TransportBase {
  public constructor() {
    super('api');
  }

  public postOrders({ menus, eslImage }: OrdersRequestType): Promise<unknown> {
    return this.http
      .post('/orders', {
        menus,
        eslImage,
      })
      .then(TransportBase.handleResponse)
      .catch(TransportBase.handleError);
  }
}

export default new Test();
