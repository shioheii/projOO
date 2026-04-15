interface Bebida {
  getDescricao(): string;
  getCusto(): number;
}

class CafeExpresso implements Bebida {
  getDescricao(): string { 
    return "Café Expresso"; 
  }
  getCusto(): number { 
    return 5.0; 
  }
}

class Cappuccino implements Bebida {
  getDescricao(): string { 
    return "Cappuccino"; 
  }
  getCusto(): number { 
    return 7.0; 
  }
}

class Cha implements Bebida {
  getDescricao(): string { 
    return "Chá"; 
  }
  getCusto(): number { 
    return 4.0; 
  }
}

abstract class BebidaDecorator implements Bebida {
  constructor(protected bebida: Bebida) {}
  abstract getDescricao(): string;
  abstract getCusto(): number;
}

class Leite extends BebidaDecorator {
  getDescricao(): string { 
    return `${this.bebida.getDescricao()} + Leite`; 
  }
  getCusto(): number { 
    return this.bebida.getCusto() + 1.5; 
  }
}

class Chantilly extends BebidaDecorator {
  getDescricao(): string { 
    return `${this.bebida.getDescricao()} + Chantilly`; 
  }
  getCusto(): number { 
    return this.bebida.getCusto() + 2.0; 
  }
}

class Canela extends BebidaDecorator {
  getDescricao(): string { 
    return `${this.bebida.getDescricao()} + Canela`; 
  }
  getCusto(): number { 
    return this.bebida.getCusto() + 0.5; 
  }
}

class CaldaChocolate extends BebidaDecorator {
  getDescricao(): string { 
    return `${this.bebida.getDescricao()} + Calda de Chocolate`; 
  }
  getCusto(): number { 
    return this.bebida.getCusto() + 2.5; 
  }
}

// Café simples
let pedido1: Bebida = new CafeExpresso();
console.log(`\nPedido 1: ${pedido1.getDescricao()} => R$ ${pedido1.getCusto().toFixed(2)}`);

// Cappuccino com chantilly e canela
let pedido2: Bebida = new Cappuccino();
pedido2 = new Chantilly(pedido2);
pedido2 = new Canela(pedido2);
console.log(`Pedido 2: ${pedido2.getDescricao()} => R$ ${pedido2.getCusto().toFixed(2)}`);

// Chá com leite, chantilly e calda de chocolate
let pedido3: Bebida = new Cha();
pedido3 = new Leite(pedido3);
pedido3 = new Chantilly(pedido3);
pedido3 = new CaldaChocolate(pedido3);
console.log(`Pedido 3: ${pedido3.getDescricao()} => R$ ${pedido3.getCusto().toFixed(2)}`);

// Expresso com tudo
let pedido4: Bebida = new CafeExpresso();
pedido4 = new Leite(pedido4);
pedido4 = new Chantilly(pedido4);
pedido4 = new Canela(pedido4);
pedido4 = new CaldaChocolate(pedido4);
console.log(`Pedido 4: ${pedido4.getDescricao()} => R$ ${pedido4.getCusto().toFixed(2)}`);