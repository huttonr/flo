var _registered = []

Flo = {
  register(context, type, callback) {
    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      context  = arguments[0].context
      type     = arguments[0].type
      callback = arguments[0].callback
    }

    if (!context)  console.warn('Using Flo.register without a context is not advised as it cannot be unregistered.')
    if (!type)     throw new Error('You must supply Flo.register with a specific event type (string) to register.')
    if (!callback) throw new Error('You must supply Flo.register with a data callback to receive the event data.')

    if (typeof type !== 'string')       throw new Error('Event type supplied to Flo.register must be a string.')
    if (typeof callback !== 'function') throw new Error('Data callback supplied to Flo.register must be a function')

    if (context && _registered.find(e => (
      e.context === context &&
      e.type === type
    ))) {
      throw new Error(`Already registered event of type: '${type}' for this context.`)
    }

    _registered.push({context, type, callback})
  },

  unregister(context, type) {
    if (type) {
      //
    }
  },

  trigger(type, data) {
    //
  },
}


// Expose these temporarily
Flo._ = {}
Flo._._registered = _registered
