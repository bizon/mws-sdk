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

    this.amount--

    this.p = new Promise(async resolve => {
      await this.p

      setTimeout(() => {
        this.amount += amount

        if (this.queue.length > 0) {
          this.resolve()
        }

        resolve()
      }, interval * 1000)
    })

    const x = this.queue.shift()

    x.resolve(x.func(...x.args))
  }

  proxy(func) {
    return (...args) => new Promise((resolve, reject) => {
      this.queue.push({
        resolve,
        reject,
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
