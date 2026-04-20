import { Order } from '../Order';

export interface OrderObserver {
  update(order: Order, oldStatus: string, newStatus: string): void;
  getObserverName(): string;
}

// Sistema de Logs
export class LogSystem implements OrderObserver {
  update(order: Order, oldStatus: string, newStatus: string): void {
    console.log(`[LOG] ${new Date().toLocaleString()} - Pedido ${order.id}: ${oldStatus} → ${newStatus}`);
  }

  getObserverName(): string {
    return 'Sistema de Logs';
  }
}