import { like } from "./where/like";

const predicate = like("Hello World");
if (predicate("hello")) {
  console.log("fits");
} else {
  console.log("doesn't fit");
}
