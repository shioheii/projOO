
import { Order } from './src/Order';
import { OrderManager } from './src/OrderManager';

console.log('=== SISTEMA DE PEDIDOS - VERSÃO 1 ===\n');

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