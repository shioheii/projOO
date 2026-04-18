interface IObservador {
  atualizar(sujeito: SujeitoAbstract): void;
}

abstract class SujeitoAbstract {
  private observadores: IObservador[] = [];

  adicionarObservador(observador: IObservador): void {
    this.observadores.push(observador);
  }

  removerObservador(observador: IObservador): void {
    this.observadores = this.observadores.filter((obs) => obs !== observador);
  }

  protected notificarObservadores(): void {
    this.observadores.forEach((observador) => {
      observador.atualizar(this);
    });
  }
}

interface DadosRio {
  temperatura: number;
  pressaoAtmosferica: number;
  ph: number; 
  humidade: number; 
}

class EstacaoMonitoramento extends SujeitoAbstract {
  private localizacao: string;
  private dados: DadosRio;

  constructor(localizacao: string) {
    super();
    this.localizacao = localizacao;
    this.dados = {
      temperatura: 0,
      pressaoAtmosferica: 0,
      ph: 7,
      humidade: 0,
    };
  }

  obterLocalizacao(): string {
    return this.localizacao;
  }

  obterDados(): DadosRio {
    return { ...this.dados };
  }

  atualizarMedicoes(novosDados: Partial<DadosRio>): void {
    this.dados = { ...this.dados, ...novosDados };
    this.notificarObservadores();
  }
}

class InstituicaoEnsino implements IObservador {
  private estacoesMonitoradas: EstacaoMonitoramento[] = [];

  constructor(public readonly nome: string) {}

  iniciarMonitoramento(estacao: EstacaoMonitoramento): void {
    this.estacoesMonitoradas.push(estacao);
    estacao.adicionarObservador(this);
  }

  pararMonitoramento(estacao: EstacaoMonitoramento): void {
    this.estacoesMonitoradas = this.estacoesMonitoradas.filter(
      (e) => e !== estacao
    );
    estacao.removerObservador(this);
  }

  atualizar(sujeito: SujeitoAbstract): void {
    const estacao = sujeito as EstacaoMonitoramento;
    const dados = estacao.obterDados();
    
    console.log(`\n${this.nome} - Atualização da estação: ${estacao.obterLocalizacao()}`);
    console.log(`Temperatura: ${dados.temperatura}°C`);
    console.log(`Pressão atmosférica: ${dados.pressaoAtmosferica} hPa`);
    console.log(`Oxigênio dissolvido: ${dados.ph} mg/L`);
    console.log(`Velocidade da corrente: ${dados.humidade} m/s`);
  }
}

const estacaoTiete = new EstacaoMonitoramento("Rio Tietê");
const estacaoPinheiros = new EstacaoMonitoramento("Rio Pinheiros");

const institutoUSP = new InstituicaoEnsino("USP");
const centroUNIFESP = new InstituicaoEnsino("UNIFESP");
const campusUNESP = new InstituicaoEnsino("UNESP");

institutoUSP.iniciarMonitoramento(estacaoTiete);
institutoUSP.iniciarMonitoramento(estacaoPinheiros);
centroUNIFESP.iniciarMonitoramento(estacaoTiete);
campusUNESP.iniciarMonitoramento(estacaoPinheiros);

console.log("ATUALIZAÇÃO 1: Rio Tietê");
estacaoTiete.atualizarMedicoes({
  temperatura: 22.3,
  pressaoAtmosferica: 1015,
  ph: 5.8,
  humidade: 1.2,
});

console.log("\nATUALIZAÇÃO 2: Rio Pinheiros");
estacaoPinheiros.atualizarMedicoes({
  temperatura: 24.7,
  pressaoAtmosferica: 1013,
  ph: 6.2,
  humidade: 0.9,
});

console.log("\nUSP para de monitorar o Rio Tietê");
institutoUSP.pararMonitoramento(estacaoTiete);

console.log("\nATUALIZAÇÃO 3: Rio Tietê (apenas UNIFESP monitora)");
estacaoTiete.atualizarMedicoes({ 
  temperatura: 23.5, 
  ph: 5.5 
});