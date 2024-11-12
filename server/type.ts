export type TFilter = {
  category?: string;
  status?: string;
  priority?: string;
  isDeleted: boolean;
};

export type TUpdateField = {
  title?: string;
  description?: string;
  priority?: string;
  category?: string;
  status?: string;
};
