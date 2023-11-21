import { like } from "./where/like";

const predicate = like("Hello World");
if (predicate("hello")) {
  console.log("fits");
} else {
  console.log("doesn't fit");
}


/**
 * 1. Add relation
 * 1.1 add object to relation
 * 1.2 findAll objects of relation
 * 1.3 delete object from relation
 * 1.4 delete objects from relation
 */
