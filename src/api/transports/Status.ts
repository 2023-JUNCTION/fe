import TransportBase from './TransportBase';

type OrderMenuResponse = {
  id: number;
  menuId: number;
  menuName: string;
  menuCount: number;
};

export type OrderResponse = {
  id: number;
  orderMenu: OrderMenuResponse[];
  done: boolean;
  remainTime?: number;
};

type ReadOrdersResponse = {
  orders: OrderResponse[];
};

class Status extends TransportBase {
  public constructor() {
    super('api');
  }

  public readOrders(): Promise<ReadOrdersResponse> {
    return this.http.get('/orders').then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }

  public postOrderComplete(id: number): Promise<ReadOrdersResponse> {
    return this.http.post(`/orders/complete/${id}`).then(TransportBase.handleResponse).catch(TransportBase.handleError);
  }
}

export default new Status();
