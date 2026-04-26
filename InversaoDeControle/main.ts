interface IObservador {
  atualizar(dados: DadosRio, nomeEstacao: string): void;
}

abstract class SujeitoAbstract {
  private observadores: IObservador[] = [];

  adicionarObservador(observador: IObservador): void {
    this.observadores.push(observador);
  }

  removerObservador(observador: IObservador): void {
    this.observadores = this.observadores.filter((obs) => obs !== observador);
  }

  // O Sujeito empurra os dados obtidos para cada Observador
  // Com o método PUSH, o Observador não precisa chamar o Sujeito de volta para obter as informações
  protected notificarObservadores(dados: DadosRio, nomeEstacao: string): void {
    this.observadores.forEach((observador) => {
      // O Sujeito chama o callback do Observador (inversão de controle)
      // O Observador não controla quando isso acontece, ele só espera ser chamado (Princípio de Hollywood)
      observador.atualizar(dados, nomeEstacao);
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

  atualizarMedicoes(novosDados: Partial<DadosRio>): void {
    this.dados = { ...this.dados, ...novosDados };
    this.notificarObservadores(this.dados, this.localizacao);
  }
}

class InstituicaoEnsino implements IObservador {
  private dados: Record<string, DadosRio> = {};

  constructor(public readonly nome: string) {}

  iniciarMonitoramento(estacao: EstacaoMonitoramento): void {
    estacao.adicionarObservador(this);
  }

  pararMonitoramento(estacao: EstacaoMonitoramento): void {
    estacao.removerObservador(this);
  }

  // Implementação do callback do observador, com condição de leitura pela temperatura
  // É chamado pelo Sujeito (inversão de controle), a InstituicaoEnsino nunca chama isso diretamente
  atualizar(novosDados: DadosRio, nomeEstacao: string): void {
    const dadosAtuais = this.dados[nomeEstacao];
    if (
      !dadosAtuais ||
      Math.abs(dadosAtuais.temperatura - novosDados.temperatura) >= 1
    ) {
      this.dados[nomeEstacao] = novosDados;
      this.exibirDados(nomeEstacao);
    }
  }

  exibirDados(nomeEstacao: string): void {
    const dados = this.dados[nomeEstacao];
    console.log(`\n${this.nome} - Atualização da estação: ${nomeEstacao}`);
    console.log(`Temperatura: ${dados?.temperatura}°C`);
    console.log(`Pressão atmosférica: ${dados?.pressaoAtmosferica} hPa`);
    console.log(`Oxigênio dissolvido: ${dados?.ph} mg/L`);
    console.log(`Velocidade da corrente: ${dados?.humidade} m/s`);
  }
}

class Laboratorio implements IObservador {
  private dados: Record<string, DadosRio> = {};

  constructor(public readonly nome: string) {}

  iniciarMonitoramento(estacao: EstacaoMonitoramento): void {
    estacao.adicionarObservador(this);
  }

  pararMonitoramento(estacao: EstacaoMonitoramento): void {
    estacao.removerObservador(this);
  }

  // Implementação do callback do observador
  // É chamado pelo Sujeito (inversão de controle), o Laboratorio nunca chama isso diretamente
  atualizar(novosDados: DadosRio, nomeEstacao: string): void {
    this.dados[nomeEstacao] = novosDados;
    this.exibirDados(nomeEstacao);
  }

  exibirDados(nomeEstacao: string): void {
    const dados = this.dados[nomeEstacao];
    console.log(`\n${this.nome} - Atualização da estação: ${nomeEstacao}`);
    console.log(`Temperatura: ${dados?.temperatura}°C`);
    console.log(`Pressão atmosférica: ${dados?.pressaoAtmosferica} hPa`);
    console.log(`Oxigênio dissolvido: ${dados?.ph} mg/L`);
    console.log(`Velocidade da corrente: ${dados?.humidade} m/s`);
  }
}

// Test
const estacaoTiete    = new EstacaoMonitoramento("Rio Tietê");
const estacaoPinheiros = new EstacaoMonitoramento("Rio Pinheiros");
const estacaoTamandua = new EstacaoMonitoramento("Rio Tamanduateí");

const institutoUSP    = new InstituicaoEnsino("USP");
const centroUNIFESP   = new InstituicaoEnsino("UNIFESP");
const labHidro        = new Laboratorio("Lab Hidrologia");

institutoUSP.iniciarMonitoramento(estacaoTiete);
institutoUSP.iniciarMonitoramento(estacaoPinheiros);

centroUNIFESP.iniciarMonitoramento(estacaoTamandua);

labHidro.iniciarMonitoramento(estacaoTiete);
labHidro.iniciarMonitoramento(estacaoPinheiros);
labHidro.iniciarMonitoramento(estacaoTamandua);

console.log("Leituras iniciais");
estacaoTiete.atualizarMedicoes({
  temperatura: 22.3,
  pressaoAtmosferica: 1015,
  ph: 5.8,
  humidade: 1.2,
});
estacaoPinheiros.atualizarMedicoes({
  temperatura: 24.7,
  pressaoAtmosferica: 1013,
  ph: 6.2,
  humidade: 0.9,
});
estacaoTamandua.atualizarMedicoes({
  temperatura: 23.0,
  pressaoAtmosferica: 1010,
  ph: 6.0,
  humidade: 0.7,
});

console.log("\nVariação pequena no Tietê (< 1), InstituicaoEnsino ignora, Lab registra");
estacaoTiete.atualizarMedicoes({ temperatura: 22.6 });

console.log("\nVariação significativa no Tietê (>= 1), todos notificados");
estacaoTiete.atualizarMedicoes({ temperatura: 25.0, ph: 5.5 });

console.log("\nUSP para de monitorar o Rio Pinheiros");
institutoUSP.pararMonitoramento(estacaoPinheiros);

console.log("\nAtualização no Pinheiros, só Lab recebe");
estacaoPinheiros.atualizarMedicoes({ temperatura: 27.0, ph: 6.0 });