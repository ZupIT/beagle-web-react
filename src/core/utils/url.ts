export function getUrlParams(url: string): Record<string, string> {
  const queryString = url.match(/\?(.*)$/)
  if (!queryString) return {}
  const params = queryString[1].split('&')
  return params.reduce((result, param) => {
    const keyValue = param.split('=')
    return {
      ...result,
      [keyValue[0]]: keyValue[1],
    }
  }, {})
}
