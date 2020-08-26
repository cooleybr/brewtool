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
  recipeSelected = false;
  yeastModal = false;
  recipeModal = false;
  grainModal = false;
  grains: Grain[] = [];
  hops: Hop[] = [];
  availableHops = [];
  availableGrains = [{ name: 'taco', id: 'asdf' }];
  availableYeasts = [];
  selectedGrains: Grain[] = [];
  selectedHops: Hop[] = [];
  hopModal = false;
  edit = false;

  constructor(private d: DataService, private router: Router) {
    this.getRecipes();
    this.grains = this.d.getGrains();
    for (const g of this.grains) {
      this.availableGrains.push(g);
    }
    this.hops = this.d.getHops();
    this.yeast = this.d.getYeasts();

  }

  getRecipes() {
    this.d.getRecipes().subscribe(x => {
      this.recipes = x as Recipe[];
    })
  }

  editRecipe() {
    this.edit = true;
  }

  updateRecipe() {
    const id = this.selectedRecipe['_id']['$oid'];
    delete this.selectedRecipe['_id'];
    this.d.updateRecipe(id, this.selectedRecipe).subscribe(x => {
      this.getRecipes();
      this.edit = false;
    });
  }

  getRecipe(id) {
    this.selectedRecipe = this.d.getRecipe(id);
    this.recipeSelected = true;
  }


  cloneRecipe(id) {
    this.recipeModalTitle = 'Clone Recipe';
    this.selectedRecipe = this.d.getRecipe(id);
    this.recipeModal = true;
  }

  addRecipe() {
    this.recipeModalTitle = 'Add a new recipe';
    this.recipeModal = true;
    this.selectedRecipe = new Recipe();
  }

  saveRecipe() {
    delete this.selectedRecipe['_id'];
    console.log(this.selectedRecipe);
    this.d.addRecipe(this.selectedRecipe).subscribe(x => this.getRecipes());
    this.recipeModal = !this.recipeModal;
  }

  deleteRecipe(id) {
    this.d.deleteRecipe(id).subscribe(x => this.getRecipes());
    this.selectedRecipe = new Recipe();
  }

  newBatch(id) {
    this.router.navigate(['/batches/' + id]);
  }
}
