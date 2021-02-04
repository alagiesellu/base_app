export function leadingSlash (str) {
  return str.startsWith('/') ? str : '/' + str
}

export function trailingSlash (str) {
  return str.endsWith('/') ? str : str + '/'
}

export function getRoute (route = '') {
  return process.env.VUE_APP_URL_START + (route.startsWith('/') ? '' : '/') + route
}

export function hasRole (role) {
  return true
}

export function displayDateTime (datetime) {
  return require('dateformat')(new Date(datetime), ' dS mmmm, yyyy')
}

export const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout))
}
