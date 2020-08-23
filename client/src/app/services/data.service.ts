import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Grain } from '../models/grain.model';
import { Yeast } from '../models/yeast.model';
import { Hop } from '../models/hop.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  recipes = {};
  batches = {};
  ingredients = {};
  grains: Grain[] = [];
  hops: Hop[] = [];
  yeasts: Yeast[] = [];
  url = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.http.get(this.url + 'getRecipes').subscribe(x => {
      console.log(x);
      for (let r of Object.keys(x)) {
       this.recipes[x[r]['_id']['$oid']] = x[r];
      }
    });

    try {
      return this.http.get(this.url + 'getRecipes');
    }
    catch (e) {
      return of([]);
    }
  }

  getIngredients(){
    this.http.get(this.url + 'getIngredients').subscribe(x => {
      this.ingredients = x as any;
      for(const g of this.ingredients['grains']){
        let grain = new Grain();
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
      for(const h of this.ingredients['hops']){
        let hop = new Hop();
        hop.id = h[0];
        hop.name = h[1];
        hop.origin = h[2];
        hop.alpha = h[3];
        hop.type = h[4]
        hop.description = h[5];
        this.hops.push(hop);
      }
      for(const y of this.ingredients['yeasts']){
        let yeast = new Yeast();
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
    }
    catch (e) {
      return of({});
    }
  }

  getYeasts(){
    return this.yeasts;
  }

  getHops(){
    return this.hops;
  }

  getGrains(){
    return this.grains;
  }

  getRecipe(id) {
    return this.recipes[id];
  }

  addRecipe(recipe) {
    return this.http.post(this.url + 'addRecipe', recipe);
  }

  deleteRecipe(id) {
    return this.http.get(this.url + 'deleteRecipe?id=' + id);
  }

  deleteBatch(id) {
    return this.http.get(this.url + 'deleteBatch?id=' + id);
  }

  getBatches() {
    this.http.get(this.url + 'getBatches').subscribe(x => {
      for (let r of Object.keys(x)) {
        this.batches[x[r]['_id']['$oid']] = x[r];
      }
    });
    try {
      return this.http.get(this.url + 'getBatches');
    }
    catch (e) {
      return of([]);
    }

  }

  getBatch(id) {
    return this.batches[id];
  }

  addBatch(batch) {
    return this.http.post(this.url + 'addBatch', batch);
  }

  getMetrics(){
    return this.http.get(this.url + 'getMetrics');
  }

  putMetrics(id,data){
    let datas = {id:id,data:data};
    return this.http.post(this.url + 'putMetrics', datas);
  }
}
