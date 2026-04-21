import { Order } from '../Order';

// Interface do sistema legado
export interface LegacyPaymentSystem {
  makePayment(amount: number, customerId: string): string;
  getPaymentStatus(code: string): boolean;
}

// Sistema legado existente
export class OldPaymentGateway implements LegacyPaymentSystem {
  makePayment(amount: number, customerId: string): string {
    console.log(`[Legado] Processando pagamento de R$${amount.toFixed(2)} para cliente ${customerId}`);
    return `TX_${Date.now()}_${customerId}`;
  }

  getPaymentStatus(code: string): boolean {
    console.log(`[Legado] Verificando status do pagamento ${code}`);
    return true;
  }
}

// Interface do sistema atual
export interface ModernPaymentProcessor {
  processPayment(order: Order, paymentMethod: string): boolean;
  refundPayment(orderId: string): boolean;
}

// Classe que o sistema utiliza
export class ModernPaymentSystem implements ModernPaymentProcessor {
  processPayment(order: Order, paymentMethod: string): boolean {
    console.log(`[Moderno] Processando pagamento do pedido ${order.id} via ${paymentMethod}`);
    console.log(`[Moderno] Valor: R$${order.getTotal().toFixed(2)}`);
    return true;
  }

  refundPayment(orderId: string): boolean {
    console.log(`[Moderno] Processando reembolso do pedido ${orderId}`);
    return true;
  }
}

// Adapta o sistema legado para a interface moderna
export class PaymentAdapter implements ModernPaymentProcessor {
  private legacySystem: LegacyPaymentSystem;
  private customerId: string;

  constructor(legacySystem: LegacyPaymentSystem, customerId: string) {
    this.legacySystem = legacySystem;
    this.customerId = customerId;
    console.log(`[Adapter] Inicializado para cliente ${customerId}`);
  }

  processPayment(order: Order, paymentMethod: string): boolean {
    console.log(`\n[Adapter] Adaptando pagamento do pedido ${order.id}...`);
    console.log(`[Adapter] Convertendo formato moderno (${paymentMethod}) para sistema legado`);
    
    const amount = order.getTotal();
    const transactionCode = this.legacySystem.makePayment(amount, this.customerId);
    const success = this.legacySystem.getPaymentStatus(transactionCode);
    
    if (success) {
      console.log(`[Adapter] Pagamento adaptado com sucesso! Transação: ${transactionCode}`);
    }
    
    return success;
  }

  refundPayment(orderId: string): boolean {
    console.log(`\n[Adapter] Adaptando reembolso do pedido ${orderId}...`);
    console.log(`[Adapter] Convertendo solicitação de reembolso para formato legado`);
    return true;
  }
}