class TV {
  ligar(): void { 
    console.log("TV: ligada");
  }
  desligar(): void { 
    console.log("TV: desligada");
  }
  configurarEntrada(entrada: string): void {
    console.log(`TV: entrada configurada para ${entrada}`);
  }
}

class Projetor {
  ligar(): void {
    console.log("Projetor: ligado");
  }
  desligar(): void { 
    console.log("Projetor: desligado");
  }
  setModo(modo: string): void { 
    console.log(`Projetor: modo ${modo} ativado`);
  }
}

class Receiver {
  ligar(): void { 
    console.log("Receiver: ligado"); 
  }
  desligar(): void { 
    console.log("Receiver: desligado"); 
  }
  setVolume(volume: number): void { 
    console.log(`Receiver: volume ajustado para ${volume}`); 
  }
}

class PlayerMidia {
  ligar(): void { 
    console.log("PlayerMidia: ligado"); 
  }
  desligar(): void { 
    console.log("PlayerMidia: desligado"); 
  }
  play(midia: string): void { 
    console.log(`PlayerMidia: reproduzindo ${midia}`); 
  }
}

class SistemaSom {
  ligar(): void { 
    console.log("SistemaSom: ligado"); 
  }
  desligar(): void { 
    console.log("SistemaSom: desligado"); 
  }
  setSurround(ativo: boolean): void { 
    console.log(`SistemaSom: surround ${ativo ? "ativado" : "desativado"}`); 
  }
}

class LuzAmbiente {
  dimmerizar(nivel: number): void { 
    console.log(`LuzAmbiente: brilho ajustado para ${nivel}%`); 
  }
  restaurar(): void { 
    console.log("LuzAmbiente: brilho restaurado"); 
  }
}

class HomeTheaterFacade {
  constructor(
    private tv: TV,
    private projetor: Projetor,
    private receiver: Receiver,
    private player: PlayerMidia,
    private som: SistemaSom,
    private luz: LuzAmbiente
  ) {}

  assistirFilme(filme: string): void {
    console.log("\n--- Preparando para assistir filme ---");
    this.luz.dimmerizar(20);
    this.projetor.ligar();
    this.projetor.setModo("cinema");
    this.receiver.ligar();
    this.receiver.setVolume(30);
    this.som.ligar();
    this.som.setSurround(true);
    this.player.ligar();
    this.player.play(filme);
    console.log("--- Home Theater pronto! Bom filme! ---\n");
  }

  ouvirMusica(musica: string): void {
    console.log("\n--- Preparando para ouvir música ---");
    this.luz.dimmerizar(60);
    this.tv.ligar();
    this.tv.configurarEntrada("AUX");
    this.receiver.ligar();
    this.receiver.setVolume(20);
    this.som.ligar();
    this.som.setSurround(false);
    this.player.ligar();
    this.player.play(musica);
    console.log("--- Sistema de música pronto! Boa escuta! ---\n");
  }

  desligarTudo(): void {
    console.log("\n--- Desligando Home Theater ---");
    this.player.desligar();
    this.som.desligar();
    this.receiver.desligar();
    this.projetor.desligar();
    this.tv.desligar();
    this.luz.restaurar();
    console.log("--- Tudo desligado! ---\n");
  }
}

const facade = new HomeTheaterFacade(
  new TV(),
  new Projetor(),
  new Receiver(),
  new PlayerMidia(),
  new SistemaSom(),
  new LuzAmbiente()
);

facade.assistirFilme("Inception");
facade.ouvirMusica("Jazz Collection");
facade.desligarTudo();
