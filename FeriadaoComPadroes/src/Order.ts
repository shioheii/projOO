export class Order {
  constructor(
    public readonly id: string,
    public product: string,
    public quantity: number,
    public price: number,
    public status: 'pending' | 'processing' | 'completed' = 'pending'
  ) {}

  getTotal(): number {
    return this.quantity * this.price;
  }

  updateStatus(status: 'pending' | 'processing' | 'completed'): void {
    this.status = status;
    console.log(`Pedido ${this.id} - Status: ${status}`);
  }

  toString(): string {
    return `Pedido ${this.id}: ${this.quantity}x ${this.product} (R$${this.price}) - Total: R$${this.getTotal()} - Status: ${this.status}`;
  }
}