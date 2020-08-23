import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Recipe } from '../models/recipe.model';
import { Router, ChildActivationStart } from '@angular/router';
import { Hop } from '../models/hop.model';
import { Grain } from '../models/grain.model';
import { Yeast } from '../models/yeast.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {

  recipes = [];
  grainList = false;
  yeastList = false;
  yeast: Yeast[];
  recipeModalTitle = 'Add a new recipe';
  hopList = false;
  selectedRecipe: Recipe = new Recipe();
  recipeDetails = {};
  recipeSelected = false;
  yeastModal = false;
  recipeModal = false;
  grainModal = false;
  grains: Grain[] = [];
  hops: Hop[]  = [];
  availableHops = [];
  availableGrains = [{name:'taco',id:'asdf'}];
  availableYeasts = []; 
  selectedGrains: Grain[] = [];
  selectedHops: Hop[] = [];
  hopModal = false;

  constructor(private d: DataService, private router: Router) {
    this.d.getRecipes().subscribe(x => {
      this.recipes = x as Recipe[];
    })
    this.grains = this.d.getGrains();
    for(let g of this.grains){
      this.availableGrains.push(g);
    }
    this.hops = this.d.getHops();
    this.yeast = this.d.getYeasts();

  }

  getRecipe(id) {
    this.recipeDetails = this.d.getRecipe(id);
    this.recipeSelected = true;
  }


  cloneRecipe(id) {
    this.recipeModalTitle = 'Clone Recipe';
    this.selectedRecipe = this.d.getRecipe(id);
    this.recipeModal = true;
    this.clearOid();
  }

  addRecipe() {
    this.recipeModalTitle = 'Add a new recipe';
    this.recipeModal = true;
    this.selectedRecipe = new Recipe();
    this.clearOid();
  }

  clearOid(){
    if (this.selectedRecipe.hops.length > 0) {
      for (let x of this.selectedRecipe.hops) {
        delete x['_id'];
      }
    }
    if (this.selectedRecipe.grains.length > 0) {
      for (let x of this.selectedRecipe.grains) {
        delete x['_id'];
      }
    }   
  }

  saveRecipe() {
    delete this.selectedRecipe['_id']; 
    this.clearOid();
    console.log(this.selectedRecipe);
    this.d.addRecipe(this.selectedRecipe).subscribe(x =>
        this.d.getRecipes().subscribe(x => this.recipes = <any>x));
    this.recipeModal = !this.recipeModal;
  }

  deleteRecipe(id) {
    this.d.deleteRecipe(id).subscribe(x => {
      this.d.getRecipes().subscribe(x => this.recipes = <any>x);
      this.selectedRecipe = new Recipe();
    });
  }

  newBatch(id) {
    this.router.navigate(['/batches/' + id]);
  }
}
