const { Text, Checkbox, CalendarDay } = require('@keystonejs/fields');

module.exports = {
  fields: {
    description: {
      type: Text,
      isRequired: true,
    },
    isComplete: {
      type: Checkbox,
      defaultValue: false,
    },
    deadLine: {
      type: CalendarDay,
      format: 'Do MMMM YYYY',
      yearRangeFrom: '2019',
      yearRangeTo: '2029',
      isRequired: false,
      defaultValue: new Date().toISOString('YYYY-MM-DD').toString(0, 10),
    },
    assignee: {
      type: Text,
      isRequired: true,
    }
  }
}