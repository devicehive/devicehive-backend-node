
class Body {

  constructor({ action }) {
    const me = this;

    me.action = action;
  }

  get action() {
    const me = this;

    return me._action;
  }

  set action(value) {
    const me = this;

    me._action = value;
  }

  toString() {
    const me = this;

    return JSON.stringify({
      a: me.action
    });
  }

  static bild (data) {
    return new Body({
      action: data.a
    });
  }
}

module.exports = Body;
