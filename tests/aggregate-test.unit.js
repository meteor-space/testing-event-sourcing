
describe('AggregateTest', function() {

  const MyCommand = Space.domain.Command.extend('AggregateTest.MyCommand', {});
  const MyEvent = Space.domain.Event.extend('AggregateTest.MyEvent', {});
  const MyApplication = Space.Application.define('AggregateTest.MyApplication', {
    configuration: {
      appId: 'AggregateTest.MyApplication'
    }
  });

  describe('given', function() {

    beforeEach(function() {
      this.commitStoreMock = sinon.mock({
        add() {}
      });
      this.eventBusMock = sinon.mock({
        onPublish() {}
      });
      const commandBusStub = sinon.stub();
      const app = new MyApplication({
        eventBus: this.eventBusMock,
        commandBus: commandBusStub
      });
      app.injector.map('Space.eventSourcing.CommitStore').to(this.commitStoreMock.object);
      app.injector.map('Space.messaging.EventBus').to(this.eventBusMock.object);
      app.injector.map('Space.messaging.CommandBus').to(commandBusStub);

      this.aggregateTest = new Space.AggregateTest(app);
    });

    it('can be called without data', function() {
      const callWithoutData = () => {
        this.aggregateTest.given()
      };
      expect(callWithoutData).to.not.throw(Error);
    });

    it('adds a single command to the run queue to establish state before when messages', function() {
      const commandInstance = new MyCommand({
        targetId: new Guid()
      });
      this.aggregateTest.given(commandInstance);
      expect(this.aggregateTest._messages).to.matchArrayOfStructs([commandInstance])
    });

    it('adds a single event to the commit store in a commit object', function() {
      const event = new MyEvent({
        sourceId: new Guid()
      });
      this.commitStoreMock.expects("add").once();
      this.aggregateTest.given(event);
      this.commitStoreMock.verify();
    });

    it('adds an array of commands to the run queue to establish state before when messages', function() {
      const commands = [
        new MyCommand({
          targetId: new Guid()
        }),
        new MyCommand({
          targetId: new Guid()
        })
      ];
      this.aggregateTest.given(commands);
      expect(this.aggregateTest._messages).to.matchArrayOfStructs(commands)
    });

    it('adds an array of events to the commit store in a commit object', function() {
      const aggregateId = new Guid();
      const events = [
        new MyEvent({
          sourceId: aggregateId
        }),
        new MyEvent({
          sourceId: aggregateId
        })
      ];
      this.commitStoreMock.expects("add").once();
      this.aggregateTest.given(events);
      this.commitStoreMock.verify();
    });

  });

  describe('when', function() {

    it('adds a single event to the run queue with existing items', function() {
      const whenCommand = new MyCommand({
        targetId: new Guid()
      });
      this.aggregateTest._messages.push(whenCommand);
      const event = new MyEvent({
        sourceId: new Guid()
      });
      this.aggregateTest.when(event);
      expect(this.aggregateTest._messages).to.matchArrayOfStructs([whenCommand, event])
    });

    it('adds a single command to the run queue', function() {
      const command = new MyCommand({
        targetId: new Guid()
      });
      this.aggregateTest.when(command);
      expect(this.aggregateTest._messages).to.matchArrayOfStructs([command])
    });

    it('adds an array of commands to the run queue', function() {
      const commands = [
        new MyCommand({
          targetId: new Guid()
        }),
        new MyCommand({
          targetId: new Guid()
        })
      ];
      this.aggregateTest.when(commands);
      expect(this.aggregateTest._messages).to.matchArrayOfStructs(commands)
    });

    it('adds an array of events to the run queue', function() {
      const events = [
        new MyEvent({
          sourceId: new Guid()
        }),
        new MyEvent({
          sourceId: new Guid()
        })
      ];
      this.aggregateTest.when(events);
      expect(this.aggregateTest._messages).to.matchArrayOfStructs(events)
    });

  });

  describe('expect', function() {

    it('can take a function that returns an array of events, running the initialized test as a result', function() {
      this.aggregateTest._run = sinon.spy();
      const events = [
        new MyEvent({
          sourceId: new Guid()
        }),
        new MyEvent({
          sourceId: new Guid()
        })
      ];
      this.aggregateTest.expect(function() {
        return events
      });
      expect(this.aggregateTest._expectedEvents).to.matchArrayOfStructs(events);
      expect(this.aggregateTest._run).to.have.been.called;
    });

    it('can take an array of events, running the initialized test as a result', function() {
      this.aggregateTest._run = sinon.spy();
      const events = [
        new MyEvent({
          sourceId: new Guid()
        }),
        new MyEvent({
          sourceId: new Guid()
        })
      ];
      this.aggregateTest.expect(events);
      expect(this.aggregateTest._expectedEvents).to.matchArrayOfStructs(events);
      expect(this.aggregateTest._run).to.have.been.called;
    });

  });

});
