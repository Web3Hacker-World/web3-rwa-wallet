export const createBgAction = (sendMessage: Function, onMessage: Function) => {
  return async (action: string, params = {}, opts = {}) => {
    let left = 0
    let top = 0
    let newWindow = ''
    const width = 800
    const height = 800
    const { screenX, screenY, outerWidth } = window
    top = Math.max(screenY, 0)
    left = Math.max(screenX + (outerWidth - width), 0)
    const returnedPromise = new Promise((resolve, reject) => {
      const { tabId } = opts
      // console.log('====> returnedPromise tabId :', tabId)
      onMessage(`actionResolve@${tabId}`, resolve)
      onMessage(`actionReject@${tabId}`, reject)
    })

    try {
      opts = {
        top,
        left,
        width,
        height,
        ...opts,
      }
      newWindow = await sendMessage('internalCall', { action, params, opts }, 'background')
    }
    catch (e) {
      console.log('====> e :', e)
    }

    return returnedPromise
  }
}