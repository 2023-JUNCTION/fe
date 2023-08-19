import TransportBase from './TransportBase';

interface OrderMenuResponse {
  id: number;
  menuId: number;
  menuName: string;
  menuCount: number;
}

interface OrderResponse {
  id: number;
  orderMenu: OrderMenuResponse[];
  done: boolean;
}

interface ReadOrdersResponse {
  orders: OrderResponse[];
}

class Test extends TransportBase {
  public constructor() {
    super('api');
  }

  public readOrders(): Promise<ReadOrdersResponse> {
    return this.http.get('/orders').then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }
}

export default new Test();
