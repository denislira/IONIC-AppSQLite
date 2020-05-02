import { Component } from '@angular/core';
import { DatabaseService } from './../database.service';
import { ProdutoService, Produto } from './../produto.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage { 
  toast: any;
  produtos: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null; 
  categ: any;

  constructor(
    public dbProvider:DatabaseService,
    private providerProdutos:ProdutoService,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private router: Router
     ) {}

  ngOnInit() {
    this.getAllProdutos();
    
  }

  ionViewWillLeave(){
    this.getAllProdutos();
  }

  criar(categ){
    this.dbProvider.criarCategorias();
    //alert(this.categ);
  }

  getAllProdutos(){
    this.providerProdutos.getAll({ ativo: !this.onlyInactives, nome: this.searchText })
    .then((result: any[]) => {
      this.produtos = result;
    } );
  }

  addProdutos(){
   this.router.navigate(['/editar']);
  }

  editarProdutos(id:number){
    this.router.navigate(['/editar', id]);
  }

  removerProdutos(produto:Produto){
    this.providerProdutos.remove(produto.id)
    .then(() => {
     var index = this.produtos.indexOf(produto);
     this.produtos.splice(index, 1);
     this.toast = this.toastCtrl.create({
       message: 'Produto Removido.', 
       duration: 3000, 
       position:'bottom'})
       .then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
    } );

  }

  filtrarProdutos(ev: any){
    this.getAllProdutos();
  }

}
