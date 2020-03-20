'use strict';
module.exports = (sequelize, DataTypes) => {
  const itemTag = sequelize.define('itemTag', {
    todoItemId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  itemTag.associate = function(models) {
    itemTag.belongsTo(models.tag)
    itemTag.belongsTo(models.todoItem)
  };
  return itemTag;
};