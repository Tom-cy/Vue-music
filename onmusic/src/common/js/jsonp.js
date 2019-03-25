import originJSONP from 'jsonp'

export default function jsonp(url, data, option) {
  // url的拼接
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJSONP(url, option, function (err, data) {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// 定义一个url 拼接的方法
function param(data) {
  let url = ''
  for (var i in data) {
    let value = data[i] !== undefined ? data[i] : ''
    url += '&' + i + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

// export function param(data) {
//   let url = ''
//   for (var k in data) {
//     let value = data[k] !== undefined ? data[k] : ''
//     url += '&' + k + '=' + encodeURIComponent(value)
//   }
//   return url ? url.substring(1) : ''
// }
