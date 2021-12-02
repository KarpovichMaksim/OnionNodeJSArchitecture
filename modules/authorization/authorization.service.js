const permissions = {
  "/posts/create": "user",
  "/posts/update": "user",
  "/posts/delete": "user",

  "/users": "administrator",
  "/users/update": "administrator",
  "/users/delete": "administrator",
  "/users/grant": "administrator",
  "/users/revoke": "administrator",

  "/roles": "administrator",
  "/roles/create": "administrator",
  "/roles/delete": "administrator",
};

class AuthorizationService {
  constructor(usersRepository, rolesRepository, errors) {
    this.usersRepository = usersRepository;
    this.rolesRepository = rolesRepository;
    this.errors = errors;
  }
  async getPermissions(id) {
    const [UserDB, roleDB] = await Promise.all([
      this.usersRepository.findOne({
        where: {
          id,
        },
      }),
      this.rolesRepository.findOne({
        where: {
          name: "administrator",
        },
      }),
    ]);

    if (!UserDB || !roleDB) {
      throw this.errors.invalidId;
    }

    const hasRole = await UserDB.hasRole(roleDB);

    return hasRole;
  }

  async checkPermissions(user, route) {
    if (!permissions[route]) {
      return;
    }

    if (!user) {
      throw this.errors.accessDenied;
    }

    const [UserDB, roleDB] = await Promise.all([
      this.usersRepository.findOne({
        where: {
          id: user,
        },
      }),
      this.rolesRepository.findOne({
        where: {
          name: permissions[route],
        },
      }),
    ]);

    if (!UserDB || !roleDB) {
      throw this.errors.invalidId;
    }

    const hasRole = await UserDB.hasRole(roleDB);

    if (!hasRole) {
      throw this.errors.accessDenied;
    }

    return hasRole;
  }
}

module.exports = AuthorizationService;
