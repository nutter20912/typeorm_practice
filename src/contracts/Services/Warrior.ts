type router = {
  method: string,
  path: string,
  action: Function
};

export interface Warrior {
  fight(ctx): string;
  sneak(): string;
  router(): router;
}
