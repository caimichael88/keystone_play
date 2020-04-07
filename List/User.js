const { Text, Password } = require('@keystonejs/fields');

module.exports = {
  fields: {
    userName: {
      type: Text,
      isRequired: true,
    },
    passowrd: {
      type: Password,
      isRequired: true,
    }
  }
};