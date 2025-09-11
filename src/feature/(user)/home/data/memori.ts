import { StaticImageData } from "next/image";

export type Content = StaticImageData | string | "launching soon";

export interface Memori {
  id: number;
  content: Content;
  title: string;
}

export const memoriData: Memori[] = [
  {
    id: 1,
    content: "Launching Soon 1",
    title: "Soon",
  },
  {
    id: 2,
    content: "Launching Soon 2",
    title: "Soon",
  },
  {
    id: 3,
    content: "launching soon 3",
    title: "Soon",
  },
  {
    id: 4,
    content: "launching soon 4",
    title: "Soon",
  },
  {
    id: 5,
    content: "launching soon 5",
    title: "Soon",
  },
  {
    id: 6,
    content: "launching soon 6",
    title: "Soon",
  },
];
