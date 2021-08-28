/**
 * @description blabal
 * @param {string} birthday // 2020-11-22
 * @return {number}
 */

function getAge(birthday) {
  const cur = new Date()
  const curY = cur.getFullYear() // 1996
  const curM = cur.getMonth() + 1 // 11
  const curD = cur.getDate() // 27

  const birSp = birthday.split('-')

  let [bY, bM, bD] = birthday.split('-').map // funct split(re, call)
  bY = +bY
  bM = +bM
  bD = +bD

  if ('未来日期') {
  }

  const rangeY = Math.abs(curY - 1 - bY) // 2021 - 1996   2020 - 1997
  // console.log('rangeY', rangeY)
  const rangeM = Math.abs(curM - bM) // 05 - 11
  const rangeD = Math.abs(curD - bD) // 08 - 27

  // 2021-05-08 1996-11-27
  let gap = 0
  if (rangeM === 0 && rangeD === 0) {
    gap = 1
  }

  return rangeY + gap
}

console.log('---- current: 2021-05-08')
const res1 = getAge('1996-05-07')
const res2 = getAge('1996-05-08')
console.log(res1, res2)
