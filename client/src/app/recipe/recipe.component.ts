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
  availableHops: Hop[] = [];
  availableGrains: Grain[] = [];
  selectedGrains: Grain[] = [];
  selectedHops: Hop[] = [];
  hopModal = false;

  constructor(private d: DataService, private router: Router) {
    this.d.getRecipes().subscribe(x => {
      this.recipes = x as Recipe[];
    })
    this.d.getGrains().subscribe(x => {
      this.grains = x as Grain[];
      this.clearOid();
    })
    this.d.getHops().subscribe(x => {
      this.hops = x as Hop[];
      this.clearOid();
    })
    this.d.getYeast().subscribe(x => {
      this.yeast = x as Yeast[];
      this.clearOid();
    })
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

  resetGrains() {
    this.d.getGrains().subscribe(x => {
      this.grains = x as Grain[];
    })
  }

  resetHops() {
    this.d.getHops().subscribe(x => {
      this.hops = x as Hop[];
    })
  }

  resetYeast() {
    this.d.getYeast().subscribe(x => {
      this.yeast = x as Yeast[];
    })
  }

  addYeast(name, description) {
    const yeast = new Yeast();
    yeast.name=name;
    yeast.description=description;
    this.d.addYeast(yeast).subscribe(x => this.resetYeast());
    this.yeastList = !this.yeastList;
  }

  addGrain(name, description) {
    const grain = new Grain();
    grain.name=name;
    grain.description=description;
    this.d.addGrains(grain).subscribe(x => this.resetGrains());
    this.grainList = !this.grainList;
  }

  addHop(name, description, alpha) {
    const hop = new Hop();
    hop.name=name;
    hop.description=description;
    hop.alpha=alpha;
    this.d.addHops(hop).subscribe(x => this.resetHops());
    this.hopList = !this.hopList;
  }

  removeGrain(id) {
    this.d.deleteGrains(id).subscribe(x => this.resetGrains());
  }

  removeYeast(id) {
    this.d.deleteYeast(id).subscribe(x => this.resetYeast());
  }

  removeHop(id) {
    this.d.deleteHops(id).subscribe(x => this.resetHops());
  }

  newBatch(id) {
    this.router.navigate(['/batches/' + id]);
  }

}
