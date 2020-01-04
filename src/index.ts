const log = console.log.bind(console)

class EventHub {
  private cache: { [key: string]: Array<(data: unknown) => void> } = {}
  on(eventName: string, fn: (data: unknown) => void) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }
  emit(eventName: string, data?: unknown) {
    (this.cache[eventName] || []).forEach(fn => fn(data))
  }
  off(eventName: string, fn: (data: unknown) => void) {
    let index = indexOf(this.cache[eventName], fn)
    if (index > -1) this.cache[eventName].splice(index, 1)
  }
}

function indexOf(array: string | any[], item: any) {
  if (array === undefined) return -1
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) return i
  }
  return -1
}

export default EventHub