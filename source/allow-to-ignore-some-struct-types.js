Space.Struct.mixin({

  // Allow to pass in certain constructors as types to ignore
  // those values from being checked by the struct
  _checkFields(data) {
    let fields = this.fields();
    let cleanedFields = {};
    for (let field in fields) {
      if (fields.hasOwnProperty(field)) {
        if (_.isFunction(data[field])) {
          cleanedFields[field] = Match.Any;
        } else {
          cleanedFields[field] = fields[field];
        }
      }
    }
    check(data, cleanedFields);
  }

});