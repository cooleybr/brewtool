import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Batch } from '../models/batch.model';
import { Recipe } from '../models/recipe.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  recipes: Recipe[] = [];
  batches: Batch[] = [];
  batchModal = false;
  selectedBatch = 'Select';
  batchDetails: Batch = new Batch();
  selectedRecipe = 'Select';
  recipeDetails: Recipe = new Recipe();
  clone = false;
  metricsDialog = false;
  batchId = '';
  file: File;
  hasData = false;
  quality = ['Awesome','Pretty Good','Alright','Not Great','Garbage'];

  constructor(private d: DataService, private route: ActivatedRoute, private router: Router) {
    this.d.getRecipes().subscribe(x => this.recipes = x as Recipe[]);
    this.d.getBatches().subscribe(x => { this.batches = x as Batch[]; });
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(x => {
      if (x.get('id') !== null) {
        this.newBatch(x.get('id'));
      }

    });

  }

  viewBatch(id, editable) {
    this.clone = editable;
    this.batchDetails = this.d.getBatch(id);
    this.recipeDetails = this.d.getRecipe(this.batchDetails['recipe']);
    this.batchModal = !this.batchModal;
  }

  updateBatch(){
    const id = this.batchDetails['_id']['$oid'];
    delete this.batchDetails['_id'];
    this.d.updateBatch(id,this.batchDetails).subscribe(x=>this.d.getBatches().subscribe(y=>this.batches=y as Batch[]));
    this.batchModal = !this.batchModal;
  }

  getHeader() {
    if (this.clone) {
      return 'New Batch Details';
    }
    else {
      return 'View Batch Details';
    }
  }

  // Optional recipe parameter will come in if defining a new recipe
  // Recipe parameter will trigger a new recipe popup window
  newBatch(recipe?) {
    this.recipeDetails = this.d.getRecipe(recipe);
    this.clone = true;
    this.batchModal = !this.batchModal;
  }

  saveBatch() {
    this.batchDetails['recipe'] = this.recipeDetails['_id']['$oid'];
    delete this.batchDetails['_id'];
    this.batchDetails.date = new Date().toLocaleString();
    this.d.addBatch(this.batchDetails).subscribe(x => this.d.getBatches().subscribe(y => this.batches = y as Batch[]));
    this.batchModal = !this.batchModal;
    this.selectedRecipe = 'Select';
  }

  deleteBatch(id) {
    this.d.deleteBatch(id).subscribe(x => {
      this.d.getBatches().subscribe(x => this.batches = x as Batch[]);
    });
  }

  // Raises a metrics add/view dialog
  showMetrics(id) {
    this.metricsDialog = true;
    this.batchId = id;
    this.checkForData();
    //this.router.navigate(['/metrics/' + id]);
  }

  // routes to metrics panel for analysis
  getMetrics() {
    this.router.navigate(['/metrics/' + this.batchId]);
  }

  myUploader(event) {
    this.file = event.files[0];
    this.showFile();
  }

  showFile() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.d.putMetrics(this.batchId, fileReader.result.toString()).subscribe(x => this.hasData = this.metricsDialog = false);
    }
    fileReader.readAsText(this.file);
  }

  checkForData() {
    this.d.getMetrics().subscribe(x => {
      for (let f in x) {
        if (x[f]['id'] === this.batchId) {
          this.hasData = true;
        }
      }
    });
  }

  closeMetrics() {
    this.hasData = this.metricsDialog = false;
  }


}
