export const saveItem = (name, data) => {
  try {
    localStorage.setItem(name, JSON.stringify(data));
    return true;
  } catch (error) {
    console.log('Error save to local storage:', error);
    return false;
  }
};

export const getItem = (name) => {
  try {
    const item = localStorage.getItem(name);
    return JSON.parse(item);
  } catch (error) {
    console.log('Error save to local storage:', error);
    return null;
  }
};
