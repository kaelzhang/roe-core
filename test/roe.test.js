const {
  runner
} = require('./fixtures/runner')

const CASES = [
  // [method, pathname, code, body]
  ['get', '/hello', 200, 'hello']
]

const logs = []

runner(CASES, 'normal', {
  plugins: {
    bog: {
      enable: true,
      package: 'egg-bog'
    },

    redis: {
      enable: true,
      package: 'egg-redis'
    },

    snowflake: {
      enable: true,
      package: 'egg-snowflake'
    }
  },

  bog: {
    client: {
      on: {
        error (time, level, log) {
          logs.push(log)
        }
      }
    }
  },

  snowflake: {

  },

  redis: {
    clients: {
      a: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 0
      },
      b: {
        host: '127.0.0.1',
        port: 6379,
        password: '',
        db: 1
      }
    }
  }
}, t => {
  t.deepEqual(logs, [
    'bog info'
  ])
})