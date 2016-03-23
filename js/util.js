function formatDate(unitTime) {
  'use strict';
  let date = new Date(unitTime);
  let formatted = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() +
  ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  return formatted;
}
