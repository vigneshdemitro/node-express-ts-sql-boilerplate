'use strict';
const { configDotenv } = require('dotenv');
const { faker } = require('@faker-js/faker');
const { hash } = require('bcrypt');
const { DataTypes } = require('sequelize');
configDotenv();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
      },
      gender: {
        type: DataTypes.ENUM('male', 'female'),
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    const hashPassword = () => hash('test@123', parseInt(process.env.SALT, 10));

    const createRandomUser = async (role) => ({
      email: faker.internet.email({ provider: 'example.fakerjs.dev' }),
      password: await hashPassword(),
      name: faker.person.firstName(),
      role,
      gender: faker.person.sex(),
    });

    const admin = await createRandomUser('admin');
    const users = await Promise.all(Array.from({ length: 4 }, () => createRandomUser('user')));
    await queryInterface.bulkInsert('users', [admin, ...users], {});
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('users');
  }
};
