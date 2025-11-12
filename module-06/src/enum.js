// enum
// set of fixed string literal
var User;
(function (User) {
    User["Admin"] = "Admin";
    User["Editor"] = "Editor";
    User["Viewer"] = "Viewer";
})(User || (User = {}));
var canEdit = function (role) {
    if (role === User.Admin || role === User.Editor) {
        return true;
    }
    else
        return false;
};
var isEditPermissable = canEdit(User.Admin);
console.log(isEditPermissable);
