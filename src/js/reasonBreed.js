import Breeds from "./Breeds.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const Breed = new Breeds('#selectedBreeds', 'Breeds');
Breed.init()
