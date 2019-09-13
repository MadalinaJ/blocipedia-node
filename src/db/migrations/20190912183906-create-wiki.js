'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Wikis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull: false
	      //defaultValue: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        //onDelete: "CASCADE", 
        allowNull: false,    // validation to prevent null value
        references: {        // association information
          model: "Users",   // table name
          key: "id",         // attribute to use
          as: "userId"      // reference as topicId
        },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Wikis');
  }
};