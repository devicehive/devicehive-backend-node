
class ProxyMessage {

  constructor ({ id, type, action, status, payload }) {
    const me = this;

    me._id = id;
    me._type = type;
    me._action = action;
    me._status = status;
    me._payload = payload;
  }

  get id() {
    const me = this;

    return me._id;
  }

  set id(value) {
    const me = this;

    me._id = value;
  }

  get type() {
    const me = this;

    return me._type;
  }

  set type(value) {
    const me = this;

    me._type = value;
  }

  get action() {
    const me = this;

    return me._action;
  }

  set action(value) {
    const me = this;

    me._action = value;
  }

  get status() {
    const me = this;

    return me._status;
  }

  set status(value) {
    const me = this;

    me._status = value;
  }

  get payload() {
    const me = this;

    return me._payload;
  }

  set payload(value) {
    const me = this;

    me._payload = value;
  }

  toString() {
    const me = this;

    return JSON.stringify({
      id: me.id,
      t: me.type,
      a: me.action,
      s: me.status,
      p: JSON.stringify(me.payload ? me.payload : {})
    });
  }

  static build (data) {
    return new ProxyMessage({
      id: data.id,
      type: data.t,
      action: data.a,
      status: data.s,
      payload: data.p
    })
  }

}

module.exports = ProxyMessage;
