import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  recipes = {};
  batches = {};

  constructor(private http: HttpClient) { }

  getRecipes() {
    this.http.get('http://localhost:5000/get_recipes').subscribe(x => {
      for (let r of Object.keys(x)) {
       this.recipes[x[r]['_id']['$oid']] = x[r];
      }
    });

    try {
      return this.http.get('http://localhost:5000/get_recipes');
    }
    catch (e) {
      return of([]);
    }
  }

  getGrains() {
    try {
      return this.http.get('http://localhost:5000/get_grains');
    }
    catch (e) {
      return of([]);
    }
  }

  getYeast() {
    try {
      return this.http.get('http://localhost:5000/get_yeast');
    }
    catch (e) {
      return of([]);
    }
  }

  getHops() {
    try {
      return this.http.get('http://localhost:5000/get_hops');
    }
    catch (e) {
      return of([]);
    }
  }

  addGrains(grain) {
    return this.http.post('http://localhost:5000/add_grains', grain);
  }

  addYeast(yeast) {
    return this.http.post('http://localhost:5000/add_yeast', yeast);
  }

  addHops(hop) {
    return this.http.post('http://localhost:5000/add_hops', hop);
  }

  deleteGrains(id) {
    return this.http.get('http://localhost:5000/delete_grains?id=' + id);
  }

  deleteYeast(id) {
    return this.http.get('http://localhost:5000/delete_yeast?id=' + id);
  }

  deleteHops(id) {
    return this.http.get('http://localhost:5000/delete_hops?id=' + id);
  }

  getRecipe(id) {
    return this.recipes[id];
  }

  addRecipe(recipe) {
    return this.http.post('http://localhost:5000/add_recipe', recipe);
  }

  deleteRecipe(id) {
    return this.http.get('http://localhost:5000/delete_recipe?id=' + id);
  }

  deleteBatch(id) {
    return this.http.get('http://localhost:5000/delete_batch?id=' + id);
  }

  getBatches() {
    this.http.get('http://localhost:5000/get_batches').subscribe(x => {
      for (let r of Object.keys(x)) {
        this.batches[x[r]['_id']['$oid']] = x[r];
      }
    });
    try {
      return this.http.get('http://localhost:5000/get_batches');
    }
    catch (e) {
      return of([]);
    }

  }

  getBatch(id) {
    return this.batches[id];
  }

  addBatch(batch) {
    return this.http.post('http://localhost:5000/add_batch', batch);
  }

  getMetrics(){
    return this.http.get("http://localhost:5000/getMetrics");
  }

  putMetrics(id,data){
    let datas = {id:id,data:data};
    return this.http.post("http://localhost:5000/putMetrics", datas);
  }
}
