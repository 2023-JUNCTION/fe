import TransportBase from './TransportBase';

type OrdersRequestType = {
  tableNumber?: number;
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
        tableNumber: 0,
        menus,
        eslImage,
      })
      .then(TransportBase.handleResponse)
      .catch(TransportBase.handleError);
  }
}

export default new Test();
