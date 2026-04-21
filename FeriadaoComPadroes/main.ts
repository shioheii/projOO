import { OrderManager } from './src/OrderManager';
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

console.log('=== SISTEMA DE PEDIDOS ===\n');

const manager = OrderManager.getInstance();

// Testando Factoru
const standardFactory = new StandardOrderFactory();
const premiumFactory = new PremiumOrderFactory();
const bulkFactory = new BulkOrderFactory();

const order1 = standardFactory.createOrder('001', 'Notebook', 1, 2500);
const order2 = premiumFactory.createOrder('002', 'Mouse Gamer', 2, 150);
const order3 = bulkFactory.createOrder('003', 'Camisetas', 10, 30);

manager.addOrder(order1);
manager.addOrder(order2);
manager.addOrder(order3);

// Testando diferentes estratégias para o mesmo pedido
const expressStrategy = new ExpressShipping();
const economicStrategy = new EconomicShipping();
const freeStrategy = new FreeShipping();

console.log('\nTeste de estratégias para o pedido 001 (Notebook):');
const calculator = new ShippingCalculator(expressStrategy);
calculator.calculateShipping(order1);

calculator.setStrategy(economicStrategy);
calculator.calculateShipping(order1);

calculator.setStrategy(freeStrategy);
calculator.calculateShipping(order1);

// Mudando status para testar observer
console.log('\nAlterando status do pedido 002:');
order2.updateStatus('completed');

console.log('\n' + '='.repeat(60));
console.log('LISTA COMPLETA DE PEDIDOS');
console.log('='.repeat(60));

manager.listOrders().forEach(order => {
  console.log(order.toString());
  console.log('-'.repeat(40));
});

// Testes no Adapter
console.log('\nUsando sistema moderno de pagamento:');
const modernPayment = new ModernPaymentSystem();
modernPayment.processPayment(order1, 'Cartão de Crédito');

console.log('\nUsando sistema legado via Adapter:');
const legacyGateway = new OldPaymentGateway();
const adapter = new PaymentAdapter(legacyGateway, 'CLIENTE_123');
adapter.processPayment(order2, 'Boleto Bancário');

console.log('\nComparando interfaces após adapter:');
console.log('Sistema Moderno:', modernPayment.processPayment(order3, 'PIX'));
console.log('Sistema Legado Adaptado:', adapter.processPayment(order3, 'Transferência'));

console.log(`\nTotal de pedidos no sistema: ${manager.getTotalOrders()}`);