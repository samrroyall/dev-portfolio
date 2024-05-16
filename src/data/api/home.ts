import { type HomeSection } from "../../models/home";
import { mockFunc } from "../../utils";

export const getHomeData = (): Promise<HomeSection[]> =>
  mockFunc([] as HomeSection[]);
