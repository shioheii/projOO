import { Order } from './src/Order';
import { OrderManager } from './src/singleton/OrderManager';
import { 
  StandardOrderFactory,
  PremiumOrderFactory,
  BulkOrderFactory 
} from './src/factory/OrderFactory';
import {
  ExpressShipping,
  EconomicShipping,
  FreeShipping,
  ShippingCalculator
} from './src/strategy/OrderStrategy';
import {
  ModernPaymentSystem,
  OldPaymentGateway,
  PaymentAdapter
} from './src/adapter/PaymentAdapter';
import { OrderProxy } from './src/proxy/OrderProxy';
import { InsuranceDecorator, PriorityDeliveryDecorator } from './src/decorator/OrderDecorator';
import { OrderFacade } from './src/facade/OrderFacade';

console.log('=== SISTEMA DE PEDIDOS ===\n');

// Testando Factory e Singleton
const manager = OrderManager.getInstance();

const standardFactory = new StandardOrderFactory();
const premiumFactory = new PremiumOrderFactory();
const bulkFactory = new BulkOrderFactory();

const order1 = standardFactory.createOrder('001', 'Notebook', 1, 2500);
const order2 = premiumFactory.createOrder('002', 'Mouse Gamer', 2, 150);
const order3 = bulkFactory.createOrder('003', 'Camisetas', 10, 30);

manager.addOrder(order1);
manager.addOrder(order2);
manager.addOrder(order3);

// Testando Strategy
const expressStrategy = new ExpressShipping();
const economicStrategy = new EconomicShipping();
const freeStrategy = new FreeShipping();

console.log('\nTeste de estratégias para o pedido 001:');
const calculator = new ShippingCalculator(expressStrategy);
calculator.calculateShipping(order1);
calculator.setStrategy(economicStrategy);
calculator.calculateShipping(order1);
calculator.setStrategy(freeStrategy);
calculator.calculateShipping(order1);

// Testando Observer
order2.updateStatus('processing');
order2.updateStatus('completed');

// Testando Adapter
const modernPayment = new ModernPaymentSystem();
modernPayment.processPayment(order1, 'Cartão');

const legacyGateway = new OldPaymentGateway();
const adapter = new PaymentAdapter(legacyGateway, 'CLIENTE_123');
adapter.processPayment(order2, 'Boleto');

// Testando Proxy
const adminProxy = new OrderProxy('admin');
const userProxy = new OrderProxy('user');
const guestProxy = new OrderProxy('guest');

console.log('\nAdmin tentando cancelar pedido:');
adminProxy.cancelOrder('001');
console.log('\nGuest tentando cancelar pedido:');
guestProxy.cancelOrder('001');
console.log('\nUser tentando alterar preço:');
userProxy.updateOrderPrice('001', 3000);

// Testando Decorator
let decoratedOrder: Order = new InsuranceDecorator(order3);
decoratedOrder = new PriorityDeliveryDecorator(decoratedOrder);

console.log('\nPedido original:');
console.log(order3.toString());
console.log('\nPedido com decorators:');
console.log(decoratedOrder.toString());
console.log(`Total com extras: R$${decoratedOrder.getTotal().toFixed(2)}`);

// Testando Facade
const facade = new OrderFacade('admin');
const complexOrder = facade.createCompleteOrder(
  '999', 'Smartphone', 2, 1500, 'premium', 'express', true, true
);
facade.cancelOrderSecurely('999');
facade.getSystemSummary();

// Listagem final
console.log('\n' + '='.repeat(60));
console.log('LISTA COMPLETA DE PEDIDOS');
console.log('='.repeat(60));

manager.listOrders().forEach(order => {
  console.log(order.toString());
  console.log('-'.repeat(40));
});

console.log(`\nTotal de pedidos no sistema: ${manager.getTotalOrders()}`);