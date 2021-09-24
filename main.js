class PubSub {
    constructor() {
      this.handlers = [];
    }
    subscribe(event, handler, context) {
      if (typeof context === 'undefined') { context = handler; }
      this.handlers.push({ event: event, handler: handler.bind(context) });
    }
    publish(event, args) {
      this.handlers.forEach((topic) => {
        if (topic.event === event) {
          topic.handler(args)
        }
      })
    }
  };


  class Billy {
    constructor() {
      this.pubsub = new PubSub();
      this.pubsub.subscribe('message from Rose', this.emitMessage, this);
    }
    emitMessage(msg) {
      console.group('PubSub');
      console.log(`${msg}  Billy: How you doing?)`);
      console.groupEnd();
    }
    sendMessage(who) {
      who.pubsub.publish('flirt', 'Flirt from Billy');
    }
  };

  class Jack {
    constructor() {
      this.pubsub = new PubSub();
      this.pubsub.subscribe('message from Rose', this.emitMessage, this);
    }
    emitMessage() {
      console.group('PubSub');
      console.log(`Jack: How you doing?)`);
      console.groupEnd();
    }
    sendMessage(who) {
      who.pubsub.publish('flirt', 'Flirt from Jack');
    }
  };

  class Rose {
    constructor() {
      this.pubsub = new PubSub();
      this.pubsub.subscribe('flirt', this.emitMessage, this);
    }
    emitMessage(msg) {
      console.group('PubSub');
      if (msg === 'Flirt from Billy') {
        console.log("Rose: Billy sent flirt!, Jack go away!");
      } else if (msg === 'Flirt from Jack') {
        console.log("Rose: Jack sent flirt!, Billy go away!");
      }
      console.groupEnd();
    }
    sendMessage(who) {
      who.pubsub.publish('message from Rose', 'Rose: Hi');
    }
  };
  
  let billy = new Billy();
  let jack = new Jack();
  let rose = new Rose();
  jack.sendMessage(rose)