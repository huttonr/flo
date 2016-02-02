var _events = []

Flo = {
  register(type, callback, context) {
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      let arg = arguments[0]

      type     = arg.type
      callback = arg.callback
      context  = arg.context
    }

    if (!type)     throw new Error('You must supply Flo.register with a specific event type (string) to register')
    if (!callback) throw new Error('You must supply Flo.register with a callback to receive the event')

    if (context && typeof context !== 'object') throw new Error('Context supplied to Flo.register must be an object')

    if (typeof type !== 'string')       throw new Error('Event type supplied to Flo.register must be a string')
    if (typeof callback !== 'function') throw new Error('Callback supplied to Flo.register must be a function')

    let id = Random.id()

    _events.push({id, type, callback, context})
    if (Flo._expose) Flo._events = _events

    return id
  },

  unregister(idOrContext) {
    if (typeof idOrContext === 'string') {
      let index = _events.findIndex(e => (e.id === idOrContext))
      if (index >= 0) _events.splice(index, 1)
    } else if (idOrContext instanceof Array) {
      _events = _events.filter(e => (idOrContext.indexOf(e.id) === -1))
    } else if (typeof idOrContext === 'object') {
      _events = _events.filter(e => (e.context !== idOrContext))
    } else {
      throw new Error('You must supply an id (or an array of ids) or a context to Flo.unregister')
    }

    if (Flo._expose) Flo._events = _events
  },

  trigger(type, ...args) {
    if (!type)                    throw new Error('You must supply Flo.trigger with a specific event to trigger')
    if (typeof type !== 'string') throw new Error('Event supplied to Flo.trigger must be a string')

    let found = false
    for (let e of _events) {
      if (e.type === type) {
        e.callback.apply(e.context || this, args)
        found = true
      }
    }

    return found
  },
}
