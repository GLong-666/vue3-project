// 对比object是否相等
export const objectEqual = (...objects) => objects.every((obj) => JSON.stringify(obj) === JSON.stringify(objects[0]));

// 获取当前时间
export const dateNow = () => new Date().toISOString().slice(0, 10);

// 数组是否空
export const arrayIsEmpty = (arr) => Array.isArray(arr) && !arr.length;