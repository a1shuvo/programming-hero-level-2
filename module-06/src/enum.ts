// enum
// set of fixed string literal

enum User {
  Admin = "Admin",
  Editor = "Editor",
  Viewer = "Viewer",
}

const canEdit = (role: User) => {
  if (role === User.Admin || role === User.Editor) {
    return true;
  } else return false;
};

const isEditPermissable = canEdit(User.Admin);
console.log(isEditPermissable);
