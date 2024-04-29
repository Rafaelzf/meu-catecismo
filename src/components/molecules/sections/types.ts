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
  title: string;
  slug: string;
  message: string;
  icon?: null;
};
