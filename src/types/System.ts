import { Entity } from "@/entities/Entity";

export abstract class System {
  public abstract update(entities: Entity[]): void;
}
