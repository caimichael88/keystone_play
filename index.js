const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password, Relationship } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');


const PROJECT_NAME = "example-project";


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(),
  onConnect: async keystone => {
    await keystone.createItems({
      User: [
        { name: 'John Duck', email: 'john@duck.com', password: 'dolphins' ,
          posts: { where: { title_contains: 'React' }},
        },
        { name: 'Barry', email: 'bartduisters@bartduisters.com', password: 'dolphins' },
      ],
      Post: [
        { title: 'Hello Everyone' },
        { title: 'Talking about React' },
        { title: 'React is the Best' },
        { title: 'Keystone Rocks' },
      ],
    });
  },
});

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: { type: Text, isUnique: true,},
    isAdmin: { type: Checkbox },
    password: { type: Password },
    posts: {
      type: Relationship,
      ref: 'Post',
      many: true,
    }
  }
});

keystone.createList('Post', {
  fields: {
    title: {
      type: Text,
    },
    author: {
      type: Relationship,
      ref: 'User',
    }
  }
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});



module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ enableDefaultRoute: true })],
};
