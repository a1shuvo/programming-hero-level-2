// as const assertion

const UserRoles = {
  Admin: "Admin",
  Editor: "Editor",
  Viewer: "Viewer",
} as const;
const UserRoles2 = {
  Admin: "ADMIN",
  Editor: "EDITOR",
  Viewer: "VIEWER",
} as const;

const canEdit = (role: keyof typeof UserRoles) => {
  if (role === UserRoles.Admin || role === UserRoles.Editor) {
    return true;
  } else return false;
};
const canEdit2 = (role: (typeof UserRoles2)[keyof typeof UserRoles2]) => {
  if (role === UserRoles2.Admin || role === UserRoles2.Editor) {
    return true;
  } else return false;
};

const isEditPermissable = canEdit(UserRoles.Admin);
const isEditPermissable2 = canEdit2(UserRoles2.Admin);
console.log(isEditPermissable);
console.log(isEditPermissable2);
