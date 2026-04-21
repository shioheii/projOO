import { Order } from '../Order';
import { OrderManager } from '../singleton/OrderManager';

// Interface do serviço real
export interface OrderService {
  cancelOrder(orderId: string): boolean;
  getOrderDetails(orderId: string): Order | null;
  updateOrderPrice(orderId: string, newPrice: number): boolean;
}

// Serviço real
export class RealOrderService implements OrderService {
  private manager: OrderManager;

  constructor() {
    this.manager = OrderManager.getInstance();
  }

  cancelOrder(orderId: string): boolean {
    const order = this.manager.getOrder(orderId);
    if (order) {
      console.log(`[RealService] Cancelando pedido ${orderId}`);
      order.updateStatus('completed');
      return true;
    }
    console.log(`[RealService] Pedido ${orderId} não encontrado`);
    return false;
  }

  getOrderDetails(orderId: string): Order | null {
    const order = this.manager.getOrder(orderId);
    if (order) {
      console.log(`[RealService] Buscando detalhes do pedido ${orderId}`);
      return order;
    }
    return null;
  }

  updateOrderPrice(orderId: string, newPrice: number): boolean {
    console.log(`[RealService] Atualizando preço do pedido ${orderId} para R$${newPrice}`);
    return true;
  }
}

// Proxy para controle de acesso
export class OrderProxy implements OrderService {
  private realService: RealOrderService;
  private userRole: 'admin' | 'user' | 'guest';
  private accessLog: string[] = [];

  constructor(userRole: 'admin' | 'user' | 'guest') {
    this.realService = new RealOrderService();
    this.userRole = userRole;
    console.log(`[Proxy] Inicializado para usuário com papel: ${userRole}`);
  }

  private logAccess(method: string, orderId: string, success: boolean): void {
    const log = `[${new Date().toLocaleString()}] ${this.userRole} - ${method} - ${orderId} - ${success ? 'Acesso permitido' : 'Acesso negado'}`;
    this.accessLog.push(log);
    console.log(`[Proxy Log] ${log}`);
  }

  private hasPermission(action: string): boolean {
    if (this.userRole === 'admin') {
      return true;
    }
    
    if (this.userRole === 'user') {
      return action !== 'updateOrderPrice';
    }
    
    return false;
  }

  cancelOrder(orderId: string): boolean {
    if (!this.hasPermission('cancelOrder')) {
      console.log(`[Proxy] Acesso negado: ${this.userRole} não pode cancelar pedidos`);
      this.logAccess('cancelOrder', orderId, false);
      return false;
    }

    const result = this.realService.cancelOrder(orderId);
    this.logAccess('cancelOrder', orderId, result);
    return result;
  }

  getOrderDetails(orderId: string): Order | null {
    if (!this.hasPermission('getOrderDetails')) {
      console.log(`[Proxy] Acesso negado: ${this.userRole} não pode visualizar pedidos`);
      this.logAccess('getOrderDetails', orderId, false);
      return null;
    }

    const result = this.realService.getOrderDetails(orderId);
    this.logAccess('getOrderDetails', orderId, result !== null);
    return result;
  }

  updateOrderPrice(orderId: string, newPrice: number): boolean {
    if (!this.hasPermission('updateOrderPrice')) {
      console.log(`[Proxy] Acesso negado: ${this.userRole} não pode alterar preços`);
      this.logAccess('updateOrderPrice', orderId, false);
      return false;
    }

    const result = this.realService.updateOrderPrice(orderId, newPrice);
    this.logAccess('updateOrderPrice', orderId, result);
    return result;
  }

  getAccessLog(): string[] {
    return [...this.accessLog];
  }
}