import { Hop } from './hop.model';
import { Grain } from './grain.model';
import { Yeast } from './yeast.model';

export class Recipe {
    title: string = '';
    description: string = '';
    instructions: string = '';
    hops: Hop[] = [];
    grains: Grain[] = [];
    yeast: Yeast[] = [];
    OG?: number = 1.042;
}