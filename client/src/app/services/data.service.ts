import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Grain } from '../models/grain.model';
import { Yeast } from '../models/yeast.model';
import { Hop } from '../models/hop.model';
import { Recipe } from '../models/recipe.model';
import { Batch } from '../models/batch.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  recipes: Recipe[] = [];
  batches: Batch[] = [];
  ingredients = {};
  grains: Grain[] = [];
  hops: Hop[] = [];
  yeasts: Yeast[] = [];
  url = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.http.get(this.url + 'getRecipes').subscribe(x => {
      this.recipes = x as Recipe[];
    });
    return this.http.get(this.url + 'getRecipes');
  }

  getIngredients() {
    this.http.get(this.url + 'getIngredients').subscribe(x => {
      this.ingredients = x as any;
      for (const g of this.ingredients['grains']) {
        const grain = new Grain();
        grain.id = g[0];
        grain.name = g[1];
        grain.maltster = g[2];
        grain.region = g[3];
        grain.description = g[4];
        grain.type = g[5];
        grain.lovibond = g[6];
        grain.diastatic = g[7];
        this.grains.push(grain);
      }
      for (const h of this.ingredients['hops']) {
        const hop = new Hop();
        hop.id = h[0];
        hop.name = h[1];
        hop.origin = h[2];
        hop.alpha = h[3];
        hop.type = h[4]
        hop.description = h[5];
        this.hops.push(hop);
      }
      for (const y of this.ingredients['yeasts']) {
        const yeast = new Yeast();
        yeast.id = y[0];
        yeast.name = y[1];
        yeast.manufacturer = y[2];
        yeast.flocculation = y[3];
        yeast.max = y[4];
        yeast.min = y[5];
        yeast.description = y[6];
        this.yeasts.push(yeast);
      }
    });

    try {
      return this.http.get(this.url + 'getIngredients');
    } catch (e) {
      return of({});
    }
  }

  getYeasts() {
    return this.yeasts;
  }

  getHops() {
    return this.hops;
  }

  getGrains() {
    return this.grains;
  }

  getRecipe(id) {
    for (const r of this.recipes) {
      if (r['_id']['$oid'] === id) {
        return r;
      }
    }
  }

  addRecipe(recipe) {
    return this.http.post(this.url + 'addRecipe', recipe);
  }

  updateRecipe(id, data) {
    return this.http.post(this.url + 'updateRecipe?id=' + id, data);
  }

  deleteRecipe(id) {
    return this.http.get(this.url + 'deleteRecipe?id=' + id);
  }

  getBatches() {
    this.http.get(this.url + 'getBatches').subscribe(x => {
      for (const r of Object.keys(x)) {
        this.batches[x[r]['_id']['$oid']] = x[r];
      }
    });
    try {
      return this.http.get(this.url + 'getBatches');
    } catch (e) {
      return of([]);
    }
  }

  getBatch(id) {
    return this.batches[id];
  }

  addBatch(batch) {
    return this.http.post(this.url + 'addBatch', batch);
  }

  updateBatch(id, data) {
    return this.http.post(this.url + 'updateBatch?id=' + id, data);
  }

  deleteBatch(id) {
    return this.http.get(this.url + 'deleteBatch?id=' + id);
  }

  getMetrics() {
    return this.http.get(this.url + 'getMetrics');
  }

  putMetrics(id, data) {
    const datas = { id: id, data: data };
    return this.http.post(this.url + 'putMetrics', datas);
  }
}
