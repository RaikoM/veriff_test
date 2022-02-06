export type Check = {
  id: string;
  priority: number;
  description: string;
};

export type CheckResult = {
  checkId: string;
  value: 'yes' | 'no';
};
