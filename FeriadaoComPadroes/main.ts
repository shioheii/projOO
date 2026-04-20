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

console.log('=== SISTEMA DE PEDIDOS ===\n');

// Testando Singleton
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

const expressStrategy = new ExpressShipping();
const economicStrategy = new EconomicShipping();
const freeStrategy = new FreeShipping();

// Testando diferentes estratégias para o mesmo pedido
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

console.log(`\nTotal de pedidos no sistema: ${manager.getTotalOrders()}`);