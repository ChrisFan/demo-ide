const vars = {
  dirname: $dirname,
};

export const setVars = (k, v) => {
  vars[k] = v;
  return vars;
};

export const getVars = type => vars[type];

export const disposes = [];
