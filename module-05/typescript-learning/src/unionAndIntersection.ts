// Union (|) or Intersection (&)

type UserRole = "admin" | "user";

const getDashboard = (role: UserRole) => {
  if (role === "admin") {
    return "Admin Dashboard";
  } else if (role === "user") {
    return "User Dashboard";
  } else {
    return "Guest Dashboard";
  }
};

getDashboard("admin");

type Employee = {
  id: number;
  name: string;
  gender: string;
};

type Manager = {
  designamtion: string;
  teamSize: number;
};

type EmployeeManager = Employee & Manager;

const shuvoSaha: EmployeeManager = {
  id: 123,
  name: "Shuvo Saha",
  gender: "male",
  designamtion: "Software Engineer",
  teamSize: 15,
};
