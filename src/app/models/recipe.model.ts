import { Hop } from './hop.model';
import { Grain } from './grain.model';

export class Recipe {
    title: string = '';
    description: string = '';
    instructions: string = '';
    hops: Hop[] = [];
    grains: Grain[] = [];
    OG?: number = 1.042;
}