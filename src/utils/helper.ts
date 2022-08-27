export const transformStatusToTag = (status: string) => {
  switch (status) {
    case `Approved`:
      return `success`;
    case `Rejected`:
      return `error`;
    case `Pending`:
      return `processing`;
    case `failed`:
      return `error`;
    default:
      return `processing`;
  }
};

export const doingSomething = () => {
  // do something
};

export const getAge = (birthday: Date): number => {
  const now = new Date();
  return now.getFullYear() - birthday.getFullYear();
};
