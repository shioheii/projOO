import { Order } from './src/Order';
import { OrderManager } from './src/OrderManager';
import { 
  StandardOrderFactory,
  PremiumOrderFactory,
  BulkOrderFactory 
} from './src/factory/OrderFactory';

console.log('=== SISTEMA DE PEDIDOS ===\n');

// Testando Singleton
const manager1 = OrderManager.getInstance();
const manager2 = OrderManager.getInstance();
console.log('Mesma instância?', manager1 === manager2);

// Criando pedidos
const order1 = new Order('001', 'Notebook', 1, 2500);
const order2 = new Order('002', 'Mouse', 2, 50);

manager1.addOrder(order1);
manager2.addOrder(order2);

console.log('\nLista de pedidos:');
manager1.listOrders().forEach(order => console.log(order.toString()));

// Testando Factory
console.log('\nCriando pedidos com fábricas:');

const standardFactory = new StandardOrderFactory();
const premiumFactory = new PremiumOrderFactory();
const bulkFactory = new BulkOrderFactory();

const order3 = standardFactory.createOrder('003', 'Teclado Mecânico', 1, 200);
const order4 = premiumFactory.createOrder('004', 'Monitor 4K', 1, 1500);
const order5 = bulkFactory.createOrder('005', 'Camisetas', 10, 30);

manager1.addOrder(order3);
manager1.addOrder(order4);
manager1.addOrder(order5);

// Listando todos os pedidos (incluindo os do Factory)
console.log('\n📋 LISTA COMPLETA DE PEDIDOS:');
console.log('-'.repeat(50));
manager1.listOrders().forEach(order => {
  console.log(order.toString());
  console.log('-'.repeat(40));
});

// Estatísticas
console.log(`\nTotal de pedidos no sistema: ${manager1.getTotalOrders()}`);
console.log(`\nTipos de fábricas disponíveis:`);
console.log(`- ${new StandardOrderFactory().getType()}`);
console.log(`- ${new PremiumOrderFactory().getType()}`);
console.log(`- ${new BulkOrderFactory().getType()}`);