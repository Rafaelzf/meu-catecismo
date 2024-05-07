export type Section = {
  id: number;
  title: string;
  slug: string;
  active: boolean;
  message: string;
  icon?: null;
  createDate?: string;
  updateDate?: string;
};

export type SendSection = {
  id?: number;
  createDate?: string;
  updateDate?: string;
  title: string;
  slug?: string;
  active?: boolean;
  message: string;
  icon?: null;
};
