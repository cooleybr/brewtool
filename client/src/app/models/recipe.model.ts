import { Hop } from './hop.model';
import { Grain } from './grain.model';
import { Yeast } from './yeast.model';

export class Recipe {
    title = '';
    description = '';
    instructions = '';
    hops: Hop[] = [];
    grains: Grain[] = [];
    yeast: Yeast[] = [];
    OG? = '1.042';
    quality = '';
}