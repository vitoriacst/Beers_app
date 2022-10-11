const localStorage = {
  get: (name) => {
    const item = window.localStorage.getItem(name);
    return JSON.parse(item);
  },
};

export default localStorage;
