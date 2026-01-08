import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

const seedAdmin = async () => {
  try {
    const adminData = {
      name: "Admin User",
      email: "admin@gmail.com",
      password: "password123",
      role: UserRole.ADMIN,
    };

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingAdmin) {
      throw new Error("Admin user already exists");
    }

    const signUpAdmin = await fetch(
      "http://localhost:3000/api/auth/sign-up/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: process.env.APP_URL!,
        },
        body: JSON.stringify(adminData),
      }
    );

    if (signUpAdmin.ok) {
      await prisma.user.update({
        where: { email: adminData.email },
        data: { emailVerified: true },
      });
      console.log("Admin user created successfully");
    } else {
      throw new Error("Failed to create admin user");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
};

seedAdmin();
