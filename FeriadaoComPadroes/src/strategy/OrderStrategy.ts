import { Order } from '../Order';

export interface ShippingStrategy {
  calculate(order: Order): number;
  getMethodName(): string;
}

// Frete Expresso
export class ExpressShipping implements ShippingStrategy {
  calculate(order: Order): number {
    const value = order.getTotal() * 0.20;
    console.log(`Frete Expresso: R$${value.toFixed(2)} (20% do valor)`);
    return value;
  }

  getMethodName(): string {
    return 'Expresso - 20% do valor';
  }
}

// Frete Econômico
export class EconomicShipping implements ShippingStrategy {
  calculate(order: Order): number {
    const baseValue = 10;
    const perItem = order.quantity * 2;
    const value = baseValue + perItem;
    console.log(`Frete Econômico: R$${value.toFixed(2)} (R$10 + R$2/item)`);
    return value;
  }

  getMethodName(): string {
    return 'Econômico - R$10 + R$2 por item';
  }
}

// Frete Grátis
export class FreeShipping implements ShippingStrategy {
  calculate(order: Order): number {
    console.log(`Frete Grátis: R$0.00`);
    return 0;
  }

  getMethodName(): string {
    return 'Grátis - Sem custo de frete';
  }
}

// Contexto que usa a estratégia
export class ShippingCalculator {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy;
    console.log(`Estratégia de frete alterada para: ${strategy.getMethodName()}`);
  }

  calculateShipping(order: Order): number {
    console.log(`\nCalculando frete para pedido ${order.id}:`);
    return this.strategy.calculate(order);
  }
}