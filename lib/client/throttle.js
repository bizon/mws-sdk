function throttle(func, cost, amount, restore) {
  const queue = []
  let timer
  let timeout

  const next = () => {
    const left = Math.min(amount, queue.length)

    if (!timer) {
      timer = new Promise(resolve => {
        timeout = setTimeout(() => {
          amount += restore.amount
          timer = null

          if (queue.length > 0) {
            next()
          }

          resolve()
        }, restore.interval)
      })
    }

    for (let i = 0; i < left; ++i) {
      const x = queue.shift()

      amount -= x.cost
      x.resolve(x.func.apply(x.self, x.args))
    }
  }

  const throttled = function (...args) {
    return new Promise(resolve => {
      queue.push({
        resolve,
        cost,
        func,
        args,
        self: this
      })

      if (amount) {
        next()
      }
    })
  }

  throttled.abort = () => {
    clearTimeout(timeout)
  }

  return throttled
}

module.exports = throttle
