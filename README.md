# Flo

`meteor add huttonr:flo`

### Introduction

Flo is an intuitive, ultra-lite event/callback system for Meteor.
Here is an example of use with React:

```jsx
// Inbox.jsx
Inbox = React.createClass({
  getInitialState() {
    return {selection: null}
  },
  
  componentWillMount() {
    this._events = []
    
    // this._events is not part of any api, we're just saving the
    // event registration handles so we can unregister them later
    this._events.push(
      // Register an event called 'inbox_userSelectedAnEntry'
      // and have it fire callback when triggered
      Flo.register('inbox_userSelectedAnEntry', (data) => {
        this.setState({selection: data.newSelection})
      })
    )
  },
  
  componentWillUnmount() {
    // Unregister all of the events we've registered for this component,
    // in this case supplying an array of event registration handles
    Flo.unregister(this._events)
  },
  
  render() {
    /* ... */
  }
})


// InboxEntry.jsx
InboxEntry = React.createClass({
  gotClicked(e) {
    // Trigger the 'inbox_userSelectedAnEntry' event and supply newSelection
    // (meaning execute all callbacks that are registered to this event)
    Flo.trigger('inbox_userSelectedAnEntry', {newSelection: this.props._id})
  },
  
  render() {
    return (
      <div onClick={this.gotClicked}>
        {/* ... */}
      </div>
    )
  }
})
```
----------------
### API

Flo supplies three basic functions:

#### `Flo.register`
```javascript
Flo.register(type, callback, [context])
// or pass the arguments in as an object
Flo.register({type, callback, context})
```
Registers an event callback for the event of specified type (string).
Optional context is used as `this` for the callback.
Returns a handle that can be used to unregister.

#### `Flo.unregister`
```javascript
Flo.unregister(handle)
// or
Flo.unregister(context)
```
Unregisters an event callback.  Accepts either a handle given by `Flo.register`, or an array of handles
or a context.  In the case of context will unregister all event callbacks registered with that context.

#### `Flo.trigger`
```javascript
Flo.trigger(type, ...args)
// preferably
Flo.trigger(type, dataObj)
```
Triggers all event callbacks registered to this event type.
Data passed in as arguments after the type are given to the callbacks.
While one is allowed to supply more than one data argument, it is best practice to supply
a single object containing data. Returns true if an event fired as a result of this trigger
or false if no event callbacks of this type were found.
