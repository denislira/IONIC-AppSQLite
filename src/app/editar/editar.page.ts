import { Component, OnInit } from '@angular/core';
import { ProdutoService, Produto } from './../produto.service';
import { NavController, ToastController } from '@ionic/angular';
import { CategoriaService } from './../categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  toast: any;
  model:Produto;
  categorias:any[];

  constructor(
    public navCtrl: NavController, 
    private route: ActivatedRoute,
    private produtoProvider: ProdutoService,
    private toastCtrl: ToastController,
    private categoriaProvider: CategoriaService,
    private router: Router

  ) { }
  ngOnInit() {
  this.model = new Produto();
  
  this.route.queryParams.subscribe( data => {
    if (data['id']){
      this.produtoProvider.get(data['id'])
      .then((result:any)=>{
        this.model = result;
     });
    }
  });
  
}

voltarHome(){
  this.router.navigate(['/home']);
 }

ionViewDidEnter() {
  this.categoriaProvider.getAll()
  .then((result:any)=>{
    this.categorias = result;
  })
  .catch(()=>{
    this.toast = this.toastCtrl.create({
      message: 'Erro ao carregar categorias', 
      duration:2000, 
      position: 'bottom'
    }).then((toastData)=>{
      console.log(toastData);
      toastData.present();
    });
  });
}


save() {
  this.salvarProduto()
    .then(() => {
      this.toastCtrl.create({ 
        message: 'Produto salvo.', 
        duration: 1000, 
        position: 'bottom' 
      }).then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
      this.navCtrl.pop();
      
    })
    .catch(() => {
      this.toastCtrl.create({ 
      message: 'Erro ao salvar o produto.', 
      duration: 3000, 
      position: 'bottom' 
    }).then((toastData)=>{
        console.log(toastData);
        toastData.present();
      });
    });
}

private salvarProduto() {
  if (this.model.id) {
    return this.produtoProvider.update(this.model);
  } else {
    return this.produtoProvider.insert(this.model);
  }
}

}

