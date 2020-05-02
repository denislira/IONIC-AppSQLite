import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'produtosdb.db',
      location: 'default'
    });
  }

  public async criarDatabase() {
    try {
      const db = await this.getDB();
      this.criarTabelas(db);
      this.inserirDados(db);
    }
    catch (e) {
      return console.log(e);
    }
  }

  public async criarCategorias() {
    try {
      const db = await this.getDB();
      this.addCategorias(db);
    }
    catch(e){
      return console.log(e);
    }
  }

  private criarTabelas(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categoria(id integer primary key AUTOINCREMENT NOT NULL, nome TEXT)'],
      ['CREATE TABLE IF NOT EXISTS produto (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, preco REAL, data DATE, ativo integer, categoria_id integer, FOREIGN KEY(categoria_id) REFERENCES categoria(id))']
    ])
    .then(() => {console.log('Tabelas criadas')})
    .catch(e => {console.log('Erro ao criar as tabelas' + e)});
  }

  private inserirDados(db: SQLiteObject){
    db.executeSql('select COUNT(id) as qtd from categoria', [])
    .then((data: any)=> {
      //SE NÃO HOUVER REGISTROS
      if(data.rows.item(0).qtd == 0){
        //inserindo dados
        db.sqlBatch([
          ['insert into categoria (nome) values (?)', ['Limpeza']],
          ['insert into categoria (nome) values (?)', ['Bebidas']],
          ['insert into categoria (nome) values (?)', ['Congelados']],
        ])
        .then(() => {alert('Dados incluidos')})
        .catch(e => {alert(`Erro ao inserir dados ${e}`)});
      }
        })
        .catch(e => {alert(`Erro ao consultar dados! ${e}`)});
  }

  private async addCategorias(db: SQLiteObject){
   try {
      const data = await db.executeSql('SELECT * FROM categoria WHERE nome in (?)', ['Roupas']);
      if (data.rows.length  == 0) {
        db.sqlBatch([
          ['insert into categoria (nome) values (?)', ['Roupas']],
        ])
          .then(() => { alert('Dados incluidos'); })
          .catch(e => { alert(`Erro ao inserir dados ${e}`); });
      }else{
        alert('JA existe');
      }
    }
    catch (e_1) {
      alert(`Erro ao consultar dados! ${e_1}`);
    }
  }


}
