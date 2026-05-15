interface Mensagem {
  autor: string;
  conteudo: string;
  bloqueada?: boolean;
}

abstract class MensagemMediator {
  private proximo: MensagemMediator | null = null;

  setProximo(handler: MensagemMediator): MensagemMediator {
    this.proximo = handler;
    return handler;
  }

  protected repassar(mensagem: Mensagem): void {
    if (this.proximo) {
      this.proximo.processar(mensagem);
    }
  }

  abstract processar(mensagem: Mensagem): void;
}

class FiltroSpamHandler extends MensagemMediator {
  private readonly palavrasProibidas = ["spam", "promoção", "clique aqui"];

  processar(mensagem: Mensagem): void {
    const contemSpam = this.palavrasProibidas.some(p =>
      mensagem.conteudo.toLowerCase().includes(p)
    );

    if (contemSpam) {
      console.log(`[FiltroSpam] Mensagem de "${mensagem.autor}" bloqueada por spam.`);
      mensagem.bloqueada = true;
      return;
    }

    console.log(`[FiltroSpam] Mensagem de "${mensagem.autor}" aprovada.`);
    this.repassar(mensagem);
  }
}

class FiltroPalavraoHandler extends MensagemMediator {
  private readonly palavroes = ["xingamento1", "xingamento2"];

  processar(mensagem: Mensagem): void {
    this.palavroes.forEach(p => {
      if (mensagem.conteudo.toLowerCase().includes(p)) {
        mensagem.conteudo = mensagem.conteudo.replace(new RegExp(p, "gi"), "***");
      }
    });

    console.log(`[FiltroPalavrão] Conteúdo verificado.`);
    this.repassar(mensagem);
  }
}

class Mediator extends MensagemMediator {
  processar(mensagem: Mensagem): void {
    if (mensagem.bloqueada) {
      console.log(`[Mediator] Mensagem bloqueada. Encerando cadeia.`);
      return;
    }
    console.log(`[Mediator] Mensagem entregue ao chat:`);
    console.log(`             ${mensagem.autor}: "${mensagem.conteudo}"`);
  }
}

class Chat {
  private cadeia: MensagemMediator;

  constructor() {
    const filtroSpam    = new FiltroSpamHandler();
    const filtroPalavrão = new FiltroPalavraoHandler();
    const mediator    = new Mediator();

    filtroSpam
      .setProximo(filtroPalavrão)
      .setProximo(mediator);

    this.cadeia = filtroSpam;
  }

  enviarMensagem(autor: string, conteudo: string): void {
    console.log(`\n--- Nova mensagem de ${autor} ---`);
    this.cadeia.processar({ autor, conteudo });
  }
}

const chat = new Chat();

chat.enviarMensagem("Alice", "Olá pessoal, tudo bem?");
chat.enviarMensagem("Bob",   "Clique aqui para ganhar prêmios! spam");
chat.enviarMensagem("Carol", "Que xingamento1 foi esse?");
chat.enviarMensagem("David", "Reunião amanhã às 10h, não esqueçam!");