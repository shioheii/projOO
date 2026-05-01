interface Visitor {
  visitRelatorioPDF(relatorio: RelatorioPDF): void;
  visitRelatorioFinanceiro(relatorio: RelatorioFinanceiro): void;
  visitRelatorioEstoque(relatorio: RelatorioEstoque): void;
  visitRelatorioUsuarios(relatorio: RelatorioUsuarios): void;
}

interface Relatorio {
  titulo: string;
  data: Date;

  aceitar(visitor: Visitor): void;
}

class RelatorioPDF implements Relatorio {
  constructor(
    public titulo: string,
    public data: Date
  ) {}

  aceitar(visitor: Visitor): void {
    visitor.visitRelatorioPDF(this);
  }
}

class RelatorioFinanceiro implements Relatorio {
  constructor(
    public titulo: string,
    public data: Date
  ) {}

  aceitar(visitor: Visitor): void {
    visitor.visitRelatorioFinanceiro(this);
  }
}

class RelatorioEstoque implements Relatorio {
  constructor(
    public titulo: string,
    public data: Date
  ) {}

  aceitar(visitor: Visitor): void {
    visitor.visitRelatorioEstoque(this);
  }
}

class RelatorioUsuarios implements Relatorio {
  constructor(
    public titulo: string,
    public data: Date
  ) {}

  aceitar(visitor: Visitor): void {
    visitor.visitRelatorioUsuarios(this);
  }
}

class ExportarTXT implements Visitor {

  visitRelatorioPDF(relatorio: RelatorioPDF): void {
    console.log(
      "\n=== RELATORIO PDF TXT ===" +
      "\nTitulo: " + relatorio.titulo +
      "\nData: " + relatorio.data.toISOString()
    );
  }

  visitRelatorioFinanceiro(relatorio: RelatorioFinanceiro): void {
    console.log(
      "\n=== RELATORIO FINANCEIRO TXT ===" +
      "\nTitulo: " + relatorio.titulo +
      "\nData: " + relatorio.data.toISOString()
    );
  }

  visitRelatorioEstoque(relatorio: RelatorioEstoque): void {
    console.log(
      "\n=== RELATORIO ESTOQUE TXT ===" +
      "\nTitulo: " + relatorio.titulo +
      "\nData: " + relatorio.data.toISOString()
    );
  }

  visitRelatorioUsuarios(relatorio: RelatorioUsuarios): void {
    console.log(
      "\n=== RELATORIO USUARIOS TXT ===" +
      "\nTitulo: " + relatorio.titulo +
      "\nData: " + relatorio.data.toISOString()
    );
  }
}

class ExportarHTML implements Visitor {

  visitRelatorioPDF(relatorio: RelatorioPDF): void {
    console.log(
      `<h1>${relatorio.titulo}</h1>
<p>${relatorio.data.toISOString()}</p>`
    );
  }

  visitRelatorioFinanceiro(relatorio: RelatorioFinanceiro): void {
    console.log(
      `<h1>${relatorio.titulo}</h1>
<p>${relatorio.data.toISOString()}</p>`
    );
  }

  visitRelatorioEstoque(relatorio: RelatorioEstoque): void {
    console.log(
      `<h1>${relatorio.titulo}</h1>
<p>${relatorio.data.toISOString()}</p>`
    );
  }

  visitRelatorioUsuarios(relatorio: RelatorioUsuarios): void {
    console.log(
      `<h1>${relatorio.titulo}</h1>
<p>${relatorio.data.toISOString()}</p>`
    );
  }
}

const relatorio1 = new RelatorioPDF(
  "Relatorio de vendas",
  new Date()
);

const relatorio2 = new RelatorioFinanceiro(
  "Relatorio financeiro mensal",
  new Date()
);

const relatorio3 = new RelatorioEstoque(
  "Relatorio de estoque",
  new Date()
);

const relatorio4 = new RelatorioUsuarios(
  "Relatorio de usuarios",
  new Date()
);

const relatorios: Relatorio[] = [
  relatorio1,
  relatorio2,
  relatorio3,
  relatorio4
];

const exportarTxt = new ExportarTXT();
const exportarHtml = new ExportarHTML();

relatorios.forEach((relatorio) => {
  relatorio.aceitar(exportarTxt);
});

relatorios.forEach((relatorio) => {
  relatorio.aceitar(exportarHtml);
});