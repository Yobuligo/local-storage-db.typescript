export const Todo = (reason?: string): never => {
  throw new Error(reason);
};
