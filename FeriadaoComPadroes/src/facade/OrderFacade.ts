// src/facade/OrderFacade.ts
import { Order } from '../Order';
import { OrderManager } from '../singleton/OrderManager';
import { StandardOrderFactory, PremiumOrderFactory, BulkOrderFactory } from '../factory/OrderFactory';
import { ExpressShipping, EconomicShipping, FreeShipping, ShippingCalculator } from '../strategy/OrderStrategy';
import { ModernPaymentSystem, PaymentAdapter, OldPaymentGateway } from '../adapter/PaymentAdapter';
import { OrderProxy } from '../proxy/OrderProxy';
import { InsuranceDecorator, PriorityDeliveryDecorator } from '../decorator/OrderDecorator';

// Facade para simplificar todo o sistema
export class OrderFacade {
  private manager: OrderManager;
  private paymentSystem: ModernPaymentSystem;
  private proxy: OrderProxy;

  constructor(userRole: 'admin' | 'user' | 'guest' = 'user') {
    this.manager = OrderManager.getInstance();
    this.paymentSystem = new ModernPaymentSystem();
    this.proxy = new OrderProxy(userRole);
    console.log('[Facade] Sistema de pedidos inicializado');
  }

  // Método simplificado para criar e processar pedido completo
  createCompleteOrder(
    id: string,
    product: string,
    quantity: number,
    price: number,
    type: 'standard' | 'premium' | 'bulk',
    shippingType: 'express' | 'economic' | 'free',
    withInsurance?: boolean,
    withPriority?: boolean
  ): Order {
    console.log(`\n[Facade] Criando pedido completo ${id}...`);

    // 1. Criar pedido com Factory
    let order: Order;
    switch (type) {
      case 'premium':
        order = new PremiumOrderFactory().createOrder(id, product, quantity, price);
        break;
      case 'bulk':
        order = new BulkOrderFactory().createOrder(id, product, quantity, price);
        break;
      default:
        order = new StandardOrderFactory().createOrder(id, product, quantity, price);
    }

    // 2. Aplicar decorators
    if (withInsurance) {
      order = new InsuranceDecorator(order);
    }
    if (withPriority) {
      order = new PriorityDeliveryDecorator(order);
    }

    // 3. Adicionar ao gerenciador
    this.manager.addOrder(order);

    // 4. Calcular frete com Strategy
    let shippingStrategy;
    switch (shippingType) {
      case 'express':
        shippingStrategy = new ExpressShipping();
        break;
      case 'economic':
        shippingStrategy = new EconomicShipping();
        break;
      default:
        shippingStrategy = new FreeShipping();
    }
    const calculator = new ShippingCalculator(shippingStrategy);
    const shippingCost = calculator.calculateShipping(order);

    // 5. Processar pagamento
    this.paymentSystem.processPayment(order, 'Cartão');

    console.log(`[Facade] Pedido ${id} criado com sucesso!`);
    console.log(`[Facade] Valor total: R$${(order.getTotal() + shippingCost).toFixed(2)}`);
    
    return order;
  }

  // Método simplificado para cancelar pedido com segurança
  cancelOrderSecurely(orderId: string): boolean {
    console.log(`\n[Facade] Solicitando cancelamento seguro do pedido ${orderId}...`);
    return this.proxy.cancelOrder(orderId);
  }

  // Método para obter resumo do sistema
  getSystemSummary(): void {
    console.log('\n[Facade] Resumo do sistema:');
    console.log(`Total de pedidos: ${this.manager.getTotalOrders()}`);
    console.log(`Pedidos ativos:`);
    this.manager.listOrders().forEach(order => {
      console.log(`  - ${order.toString()}`);
    });
  }
}