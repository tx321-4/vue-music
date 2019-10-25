
// Storage相关

import storage from 'good-storage';

const SEARCH_KEY = '_search_'; // 双下标线标识内部key, 避免与外部key冲突
const SEARCH_MAX_LENGTH = 15; // 搜索历史最多存入数组15个

// 操作搜索历史数组的方法
// 参数： 搜索记录数组，添加的项， 筛选方法，最大数量
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare); // 判断是否以前有搜索过， compare在外部编写
  if (index === 0) { // 上一条搜索历史就是这个，就不需要添加历史
    return;
  }
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val); // 没有历史记录， 添加项目到第一项
  if (maxLen && arr.length > maxLen) { // 大于最大数量的时候，删除最后一项
    arr.pop();
  }
}

// 插入最新搜索历史到本地缓存，同时返回新的搜索历史数组
export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, []); // 如果已有历史就GET缓存中的数组，没有就空数组
  insertArray(searches, query, (item) => { // 对传入的项与已有数组进行操作
    return item === query;
  }, SEARCH_MAX_LENGTH);
  storage.set(SEARCH_KEY, searches);
  return searches;
}

// states 获取本地缓存中的数据
export function loadSearch () {
  return storage.get(SEARCH_KEY, []);
}
