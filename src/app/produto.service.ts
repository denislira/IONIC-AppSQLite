import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private dbProvider: DatabaseService) { }

  public async insert(produto:Produto){
    try {
      const db = await this.dbProvider.getDB();
      let sql = 'insert into produto (nome, preco, data, ativo, categoria_id) values (?, ?, ?, ?, ?)';
      let data = [produto.nome, produto.preco, produto.data, produto.ativo ? 1 : 0, produto.categoria_id];
      try {
        return db.executeSql(sql, data);
      }
      catch (e) {
        return console.error(e);
      }
    }
    catch (e_1) {
      return console.error(e_1);
    }  
  }
  
  public async update(produto:Produto){
    try {
      const db = await this.dbProvider.getDB();
      let sql = 'update produto set nome = ?, preco = ?, data = ?, ativo = ?, categoria_id = ? where id = ?';
      let data = [produto.nome, produto.preco, produto.data, produto.ativo ? 1 : 0, produto.categoria_id, produto.id];
      try {
        return db.executeSql(sql, data);
      }
      catch (e) {
        return console.error(e);
      }
    }
    catch (e_1) {
      return console.error(e_1);
    }  
  }

  public async remove(id:number){
    try {
      const db = await this.dbProvider.getDB();
      let sql = 'delete from produto where id = ?';
      let data = [id];
      try {
        return db.executeSql(sql, data);
      }
      catch (e) {
        return console.error(e);
      } 
    }
    catch (e_1) {
      return console.error(e_1);
    } 
  }

  public async get(id:number){
    try {
      const db = await this.dbProvider.getDB();
      let sql = 'select * from produto where id = ?';
      let data = [id];
      try {
        const data_1 = await db.executeSql(sql, data);
        if (data_1.rows.length > 0) {
          let item = data_1.rows.item(0);
          let produto = new Produto();
          produto.id = item.id;
          produto.nome = item.nome;
          produto.preco = item.preco;
          produto.data = item.data;
          produto.ativo = item.ativo;
          produto.categoria_id = item.categoria_id;
          return produto;
        }
        return null;
      }
      catch (e) {
        return console.error(e);
      }
    }
    catch (e_1) {
      return console.error(e_1);
    }
  }

  public async getAll({ ativo, nome = null }: { ativo: boolean; nome?: string; }){
    try {
      const db = await this.dbProvider.getDB();
      let sql = 'SELECT p.*, c.nome as categoria_nome FROM produto p inner join categoria c on p.categoria_id = c.id where p.ativo = ?';
      var data: any[] = [ativo ? 1 : 0];
      //filtrar pelo nome
      if (nome) {
        sql += ' and p.nome like ?';
        data.push('%' + nome + '%');
      }
      try {
        const data_1 = await db.executeSql(sql, data);
        if (data_1.rows.length > 0) {
          let produtos: any[] = [];
          for (var i = 0; i < data_1.rows.length; i++) {
            var produto = data_1.rows.item(i);
            produtos.push(produto);
          }
          return produtos;
        }
        else {
          return [];
        }
      }
      catch (e) {
        return console.error(e);
      }
    }
    catch (e_1) {
      return console.error(e_1);
    }
  }


}


export class Produto{
  id:number;
  nome:string;
  preco:number;
  data:Date;
  ativo:Boolean;
  categoria_id:number;
}