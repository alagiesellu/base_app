export function leadingSlash (str) {
  return str.startsWith('/') ? str : '/' + str
}

export function trailingSlash (str) {
  return str.endsWith('/') ? str : str + '/'
}

export function getRoute (route = '') {
  return process.env.VUE_APP_URL_START + (route.startsWith('/') ? '' : '/') + route
}

export const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
