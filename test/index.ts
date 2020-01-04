import EventHub from '../src/index'

const log = console.log.bind(console)

type TestCase = (message: string) => void

const test1: TestCase = message => {
  const eventhub = new EventHub()
  console.assert(eventhub instanceof Object === true, 'eventhub 是一个对象')
  log(message)
}

const test2: TestCase = message => {
  const eventhub = new EventHub()
  // on emit
  let called = false
  eventhub.on('xxx', data => {
    called = true
    console.assert(data[0] === '过了元旦就是年')
    console.assert(data[1] === '新年快乐')
  })
  eventhub.emit('xxx', ['过了元旦就是年', '新年快乐'])
  console.assert(called)
  log(message)
}


const test3: TestCase = message => {
  const eventhub = new EventHub()
  let called = false
  const foo = () => {
    called = true
  }
  eventhub.on('yyy', foo)
  eventhub.off('yyy', foo)
  eventhub.emit('yyy')
  console.assert(called === false)
  log(message)
}

test1('EventHub 可以创建对象')
test2('.on 了之后 .emit 会触发 .on 的函数')
test3('.off 有用')
