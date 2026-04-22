import { Order } from '../Order';

// Tipos de pedido
export enum OrderType {
  STANDARD = 'standard',
  PREMIUM = 'premium',
  BULK = 'bulk'
}

// Interface do produto
export interface IOrderFactory {
  createOrder(id: string, product: string, quantity: number, price: number): Order;
  getType(): string;
}

// Fábrica para pedidos Standard
export class StandardOrderFactory implements IOrderFactory {
  createOrder(id: string, product: string, quantity: number, price: number): Order {
    const order = new Order(id, product, quantity, price);
    order.updateStatus('processing');
    return order;
  }

  getType(): string {
    return 'Standard Order - Processamento normal';
  }
}

// Fábrica para pedidos Premium
export class PremiumOrderFactory implements IOrderFactory {
  createOrder(id: string, product: string, quantity: number, price: number): Order {
    const discountedPrice = price * 0.95;
    const order = new Order(id, product, quantity, discountedPrice);
    order.updateStatus('processing');
    console.log(`Desconto aplicado: R$${(price * quantity * 0.05).toFixed(2)}\n`);
    return order;
  }

  getType(): string {
    return 'Premium Order - Com desconto de 5%';
  }
}

// Fábrica para pedidos em lote
export class BulkOrderFactory implements IOrderFactory {
  createOrder(id: string, product: string, quantity: number, price: number): Order {
    const order = new Order(id, product, quantity, price);
    order.updateStatus('processing');
    console.log(`Bônus: Frete grátis para compras em lote\n`);
    return order;
  }

  getType(): string {
    return 'Bulk Order - Frete grátis incluso';
  }
}
