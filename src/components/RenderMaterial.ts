import { DirectionType } from "@/types/Direction"

export class RenderMaterial {
  constructor(
    public color: string,
    public isLiquid: boolean,
    public isMovable: boolean,
    public direction: DirectionType | null
  ) {}
}
