// const url = 'https://www.baidu.com';
//     const params = {
//         a: 1,
//         b: 2,
//         c: 3,
//     };

// ==> https://www.baidu.com?a=1&b=2&c=3

// function parseQs(url, params) {
//   const qs = Object.entries(params)
//     .map(([k, v]) => `${k}=${v}`)
//     .join('&')
//   return `${url}?${qs}`
// }

// const url = 'https://www.baidu.com'
// const params = {
//   a: 1,
//   b: 2,
//   c: 3,
// }
// const result = parseQs(url, params)
// console.log(result)

function flatArr(arr) {
  let queue = []
  let result = []

  queue.push(arr)
  while (queue.length) {
    const tmp = queue.shift()
    if (!Array.isArray(tmp)) return
    for (let i = 0, len = tmp.length; i < len; i++) {
      if (Array.isArray(tmp[i])) {
        queue.push(tmp[i])
        // console.log(queue)
      } else {
        result.push(tmp[i])
      }
    }
  }

  result = Array.from(new Set(result))
  result.sort((a, b) => a - b)
  return result
}
var arr = [
  [12, 2, 2],
  [6, 7, 8, 5],
  [3, 4, 5, 9, [11, 12, [1, 13, [14]]]],
]

// 实现函数
// fn(arr); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]
const res2 = flatArr(arr)
console.log(res2)
