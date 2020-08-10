import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../services/data.service';
import { Batch } from '../models/batch.model';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  dataId;
  selectedBatch = new Batch();
  recipeId = '';
  batchId = '';
  batches = [];
  metrics;
  oneMetric = [];
  singleLabels = [];
  singleTimestamp = [];
  singleSG = [];
  singleTemp = [];
  sgData = {};
  tempData = {};
  dataTypes = ['Recipes', 'Batches']//,'Grains','Hops','Yeast','Date'];
  searchData = 'Select';
  searchOption = 'Select';
  queries = [];

  constructor(private route: ActivatedRoute, private dServ: DataService) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(x => {
      if (x.get('id') !== null) {
        this.dataId = x.get('id');
        this.selectedBatch = this.dServ.getBatch(this.dataId);
        if (this.selectedBatch === undefined) {
          this.selectedBatch = new Batch();
        }
        else {
          this.dServ.getMetrics().subscribe(x => {
            this.metrics = x;
            for (let m of this.metrics) {
              if (m.id === this.dataId) {
                this.parseData(m.data);
                this.sgData = {
                  labels: this.singleTimestamp,
                  datasets: [
                    {
                      label: 'Specific Gravity',
                      data: this.singleSG,
                      fill: false,
                      borderColor: '#4bc0c0'
                    }
                  ]
                }
                this.tempData = {
                  labels: this.singleTimestamp,
                  datasets: [
                    {
                      label: 'Temperature',
                      data: this.singleTemp,
                      fill: false,
                      borderColor: '#565656'
                    }
                  ]
                }
              }
            }
          });
        }
      } 
    });
    this.dServ.getMetrics().subscribe(x=>this.metrics=x);
  }

  parseData(datas: string) {
    let start = datas.split("\n");
    for (let r of start) {
      if (r.includes('Timestamp')) {
        let header = r.split(',');
        for (let l of header) {
          this.singleLabels.push(l);
        }
      } else {
        let vals = r.split(",");
        this.singleTimestamp.push(vals[0]);
        this.singleSG.push(vals[1]);
        this.singleTemp.push(vals[2])
      }
    }


  }

  setData() {
    switch (this.searchData) {
      //  dataTypes = ['Recipes','Batches','Grains','Hops','Yeast','Date'];

      case 'Recipes': this.getRecipesList();
      break;
      case 'Batches': this.getBatchList();
      break;
      //case 'Grains': this.getGrainsList();
      //case 'Hops': this.getHopsList();
      //case 'Yeast':this.getYeastList();
      //case 'Date': this.getBatchDates();
      default: break;
    }
  }

  getRecipesList() {
    this.dServ.getRecipes().subscribe(x => {
      this.queries = [];
      const f = x as Recipe[];
      for (let g of f) {
        this.queries.push(g.title);
      }
    })
  }

  getBatchList() {
    this.dServ.getBatches().subscribe(x => {
      this.queries = [];
      const f = x as Batch[];
      for (let g of f) {
        this.queries.push(g.name);
      }
    })
  }

  setSearch(searchOption: string) {
    switch (this.searchData) {
      case 'Recipes': this.getRecipeData();
      break;
      case 'Batches': this.getBatchData();
      break;
      default: break;
    }
  }

  getRecipeData() {
    this.batches = [];
    this.dServ.getRecipes().subscribe(x => {
      let r = x as Recipe[];
      for (const rec of r) {
        if (rec.title === this.searchOption) {
          this.recipeId = rec['_id']['$oid'];
          
          console.log(this.recipeId);
        }
      }
      this.dServ.getBatches().subscribe(y => {
        const bat = y as Batch[];
        for (const b of bat) {
          if (b.recipe === this.recipeId) {
            this.batches.push({id:b['_id']['$oid'],
            name:b.name})
          }
        }
        const gdatasets = [];
        const tdatasets = [];
        let length = 1;
        for (const met of this.metrics) {
          for (const id of this.batches) {
            this.singleSG=[];
            this.singleTemp=[];
            if (met.id === id.id) {
              this.parseData(met.data);
              if(this.singleSG.length>length){
                length = this.singleSG.length;
              }
              gdatasets.push({
                label: id.name,
                data: this.singleSG,
                fill: false,
                borderColor: '#'+Math.floor(Math.random()*16777215).toString(16)
              });
              tdatasets.push({
                label: id.name,
                data: this.singleTemp,
                fill: false,
                borderColor: '#'+Math.floor(Math.random()*16777215).toString(16)
              });
            }
          }
        }
        const labels = [];
        for(let i=0;i<length;i++)
        {
          labels.push(i);
        }
        this.sgData = {
          labels: labels,
          datasets: gdatasets
        }
        this.tempData = {
          labels: this.singleTimestamp,
          datasets: tdatasets
        }
      })
    })

  }

  getBatchData() {
    console.log(this.searchOption);
  }

  isData(){
    if(Object.keys(this.sgData).length===0){
      return false;
    } else {
      return true;
    }
  }


}

@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Set(value);
  }
}
