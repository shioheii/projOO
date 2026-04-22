import { OrderObserver, LogSystem } from './observer/OrderObserver';

export class Order {
  private observers: OrderObserver[] = [];

  constructor(
    public readonly id: string,
    public product: string,
    public quantity: number,
    public price: number,
    public status: 'pending' | 'processing' | 'completed' = 'pending'
  ) {
    this.addObserver(new LogSystem());
  }

  getTotal(): number {
    return this.quantity * this.price;
  }

  updateStatus(status: 'pending' | 'processing' | 'completed'): void {
    const oldStatus = this.status;
    this.status = status;
    console.log(`\nPedido ${this.id} - Status: ${oldStatus} → ${status}`);
    this.notifyObservers(oldStatus, status);
  }

  toString(): string {
    return `Pedido ${this.id}: ${this.quantity}x ${this.product} (R$${this.price}) - Total: R$${this.getTotal()} - Status: ${this.status}`;
  }

  // OBSERVER
  addObserver(observer: OrderObserver): void {
    this.observers.push(observer);
    console.log(`[AddObserver] ${observer.getObserverName()} está monitorando pedido ${this.id}`);
  }

  removeObserver(observer: OrderObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      console.log(`[RemoveObserver] ${observer.getObserverName()} parou de monitorar pedido ${this.id}`);
    }
  }

  private notifyObservers(oldStatus: string, newStatus: string): void {
    if (oldStatus === newStatus) return;
    this.observers.forEach(observer => {
      observer.update(this, oldStatus, newStatus);
    });
  }
}