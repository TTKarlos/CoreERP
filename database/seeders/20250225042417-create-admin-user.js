const bcrypt = require("bcryptjs")
require("dotenv").config()
const { ROLES } = require("../../src/utils/constants")
const UserFactory = require("../factories/user.factory")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 8)

    // Upsert admin user
    await queryInterface.bulkInsert(
        "Users",
        [
          {
            username: "admin",
            email: "admin@example.com",
            password: hashedPassword,
            firstName: "Admin",
            lastName: "User",
            role: ROLES.ADMIN,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {
          updateOnDuplicate: ["email", "password", "firstName", "lastName", "role", "isActive", "updatedAt"],
        },
    )

    // Generate data for additional users
    const additionalUsers = await UserFactory.createMany(5)

    // Insert additional users
    for (const user of additionalUsers) {
      await queryInterface.bulkInsert("Users", [user], {
        ignoreDuplicates: true,
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all users created by this seeder, except the admin
    await queryInterface.bulkDelete("Users", { username: { [Sequelize.Op.ne]: "admin" } })
  },
}

