export const standardFetch = async (path: string) => {
  try {
    const response = await fetch(`${centralEndpoint}${path}`)
    if (!response.ok) {
      return {
        failed: true,
        failedMessage: response.status,
        response
      }
    }
    const json = await response.json()
    return { failed: false, json, response }
  } catch (e) {
    console.log(e)
  }
}

export const centralEndpoint = "https://jsonplaceholder.typicode.com"