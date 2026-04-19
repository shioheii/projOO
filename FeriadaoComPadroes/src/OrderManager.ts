import { Order } from './Order';

export class OrderManager {
  private static instance: OrderManager;
  private orders: Map<string, Order> = new Map();

  private constructor() {}

  static getInstance(): OrderManager {
    if (!OrderManager.instance) {
      OrderManager.instance = new OrderManager();
    }
    return OrderManager.instance;
  }

  addOrder(order: Order): void {
    this.orders.set(order.id, order);
    console.log(`Pedido ${order.id} adicionado`);
  }

  getOrder(id: string): Order | undefined {
    return this.orders.get(id);
  }

  listOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  getTotalOrders(): number {
    return this.orders.size;
  }
}