import { Topic } from "@prisma/client";

export type Section = {
  id: number;
  title: string;
  slug: string;
  active: boolean;
  message: string;
  icon?: string;
  createDate?: string;
  updateDate?: string;
  topics: Topic[];
};

export type SendSection = {
  id?: number;
  createDate?: string;
  updateDate?: string;
  title: string;
  slug?: string;
  active?: boolean;
  message: string;
  icon?: string;
};
