var observable = require('../observable'),
    assert     = require("assert")

describe    ('Observable', function () {
    it('should get and set values', function () {
        var obs = observable(1);

        assert.equal(1, obs());
        obs(2);
        assert.equal(2, obs());
    });

    it('should subscribe to the "change" event', function (done) {
        var obs  = observable();

        obs.sub(function (evt, val) {
            assert.equal(1, val);
            done();
        });

        obs(1);
    });

    it('should subscribe to the arbitrary events', function (done) {
        var obs  = observable();

        obs.sub("myevent", function (evt, val) {
            assert.equal(1, val);
            done();
        });

        obs.trigger("myevent", 1);
    });

    it('should send the event type', function (done) {
        var obs  = observable();

        obs.sub("myevent", function (evt, val) {
            assert.equal(evt, 'myevent');
            done();
        });

        obs.trigger("myevent", 1);
    });

    it('should send the event type (multiple events check)', function (done) {
        var obs   = observable(),
            dones = 2;

        obs.sub("myevent1 myevent2", function (evt, val) {
            if (evt === 'myevent1') {
                assert.equal(val, 1);
                if (dones-- === 0) done();
            } else if ((evt === 'myevent2')) {
                assert.equal(val, 2);
                dones--;
                if (dones-- === 0) done();
            }
        });

        obs.trigger("myevent1", 1);
        obs.trigger("myevent2", 2);
    });

    it('should receive more arguments', function (done) {
        var obs  = observable();

        obs.sub("myevent", function (evt, val1, val2) {
            assert.equal(1, val1);
            assert.equal(2, val2);
            done();
        });

        obs.trigger("myevent", 1, 2);
    });

    it('should subscribe to more than one event', function (done) {
        var obs  = observable();

        obs.sub("myevent1 myevent2", function (evt, val) {
            assert.equal(1, val);
            done();
        });

        obs.trigger("myevent2", 1);
    });

    it('should subscribe to all events with "*"', function (done) {
        var obs           = observable(),
            myevent1Check = false,
            myevent2Check = false;

        obs.sub("*", function (evt, val) {
            if (evt === 'myevent1') {
                myevent1Check = true;
                assert.equal(val, 1);
            }
            if (evt === 'myevent2') {
                myevent2Check = true;
                assert.equal(val, 2);
            }
            if (myevent1Check && myevent2Check) done();
        });

        obs.trigger("myevent1", 1);
        obs.trigger("myevent2", 2);
    });

    it('should be able to unsubscribe', function (done) {
        var obs  = observable(),
            id;

        id = obs.sub(function (evt, val) {
            assert.equal(1, val);
            done();
        });

        obs(1);
        obs.unsub(id);
        obs(2);
    });

});
