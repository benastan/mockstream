var assert = require('assert'),
    mockstream = require('..');

describe("mockstream.Mockstream", function() {
  var streamOptions, streamLength, streamString, stream, undefined;
  beforeEach(function() {
    streamOptions = {
      chunkSize: 1024
    }
  });
  describe('Mock data stream', function() {
    beforeEach(function() {
      streamOptions.streamLength = 2048;
      stream = new mockstream.MockDataStream(streamOptions);
    });
    it('should emit mock data', function(done) {
        var read = 0;
        stream.start()
            .on('data', function(data) {
                read += data.length;
            })
            .on('end', function() {
                assert.equal(streamOptions.streamLength, read);
                done();
            });        
    });    
  });
  describe("Mock data stream from string", function() {
    beforeEach(function() {
      streamOptions.streamString = "Hello, world";
      stream = new mockstream.MockDataStream(streamOptions);
    });
    it("should emit a buffer representing the string", function(done) {
      var read = '';
      stream.on('data', function(data) {
          read += data.toString();
        })
        .on('end', function() {
          assert.equal(streamOptions.streamString, read);
          done();
        })
        .start();
    });
  });
});
