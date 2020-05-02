import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private dbProvider: DatabaseService) { }


  public async getAll(){
    try {
      const db = await this.dbProvider.getDB();
      try {
        const data = await db.executeSql('select * from categoria', []);
        if (data.rows.length > 0) {
          let categorias: any[] = [];
          for (var i = 0; i < data.rows.length; i++) {
            var categoria = data.rows.item(i);
            categorias.push(categoria);
          }
          return categorias;
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
