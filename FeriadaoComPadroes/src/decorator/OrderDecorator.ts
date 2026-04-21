import { Order } from '../Order';

// Decorator base
export abstract class OrderDecorator extends Order {
  protected order: Order;

  constructor(order: Order) {
    super(order.id, order.product, order.quantity, order.price, order.status);
    this.order = order;
  }

  abstract getDescription(): string;
  abstract getTotal(): number;
}

// Decorator de Seguro Adicional
export class InsuranceDecorator extends OrderDecorator {
  private insuranceCost: number = 25;

  constructor(order: Order) {
    super(order);
    console.log(`[Decorator] Adicionando seguro ao pedido ${order.id}`);
  }

  getDescription(): string {
    const originalDesc = this.order.toString();
    return `${originalDesc} + Seguro adicional (R$${this.insuranceCost.toFixed(2)})`;
  }

  getTotal(): number {
    return this.order.getTotal() + this.insuranceCost;
  }

  toString(): string {
    return this.getDescription();
  }
}

// Decorator de Entrega Prioritária
export class PriorityDeliveryDecorator extends OrderDecorator {
  private priorityCost: number = 35;

  constructor(order: Order) {
    super(order);
    console.log(`[Decorator] Adicionando entrega prioritária ao pedido ${order.id}`);
  }

  getDescription(): string {
    const originalDesc = this.order.toString();
    return `${originalDesc} + Entrega prioritária (R$${this.priorityCost.toFixed(2)})`;
  }

  getTotal(): number {
    return this.order.getTotal() + this.priorityCost;
  }

  toString(): string {
    return this.getDescription();
  }
}