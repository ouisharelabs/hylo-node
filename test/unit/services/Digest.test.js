var root = require('root-path'),
  setup = require(root('test/setup')),
  Digest = require(root('lib/community/digest')),
  moment = require('moment');

describe('Digest', function() {
  var community, user;

  before(() => {
    community = new Community({name: 'foo', slug: 'foo'});
    user = new User({name: 'Cat'});

    return community.save().then(community => user.save())
    .then(() => user.joinCommunity(community))
    .then(() => new Post({creator_id: user.id, name: 'Hi!'}).save())
    .then(post => community.posts().attach(post.id));
  });

  describe('.sendTestEmail', function() {
    it("doesn't throw errors", function() {
      var digest = new Digest(community, moment(), moment().subtract(1, 'week'));
      return digest.fetchData().then(() => digest.sendTestEmail('foo@bar.com'));
    });
  });


});