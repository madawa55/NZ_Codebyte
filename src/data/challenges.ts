import { Challenge } from "../types";
import { CHALLENGES_L1 } from "./challengesLevel1";
import { CHALLENGES_L2 } from "./challengesLevel2";
import { CHALLENGES_L3 } from "./challengesLevel3";
import { CHALLENGES_L4 } from "./challengesLevel4";

export const CHALLENGES: Challenge[] = [
  ...CHALLENGES_L1,
  ...CHALLENGES_L2,
  ...CHALLENGES_L3,
  ...CHALLENGES_L4
];
