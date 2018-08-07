class Throttler {
  constructor(amount, restore) {
    this.amount = amount
    this.queue = []

    this.options = {
      restore
    }
  }

  async resolve() {
    const {amount, interval} = this.options.restore

    const left = Math.min(this.amount, this.queue.length)

    if (!this.timer) {
      this.timer = new Promise(async resolve => {
        setTimeout(() => {
          this.amount += amount
          this.timer = null

          if (this.queue.length > 0) {
            this.resolve()
          }

          resolve()
        }, interval)
      })
    }

    for (let i = 0; i < left; ++i) {
      const x = this.queue.shift()

      this.amount -= x.cost
      x.resolve(x.func(...x.args))
    }
  }

  proxy(func, cost = 1) {
    return (...args) => new Promise(resolve => {
      this.queue.push({
        resolve,
        cost,
        func,
        args
      })

      if (this.amount) {
        this.resolve()
      }
    })
  }
}

module.exports = Throttler
