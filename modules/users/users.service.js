const Promise = require("bluebird");

class UsersService {
  constructor(usersRepository, rolesRepository, errors) {
    super(usersRepository, errors);

    this.rolesRepository = rolesRepository;
  }

  async update(data) {
    let user = {
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    };

    return super.update(data.id, user);
  }

  async grant(userId, roleId) {
    const [user, role] = await Promise.all([
      this.repository.findById(userId),
      this.rolesRepository.findById(roleId),
    ]);

    if (!user || !role) {
      throw this.errors.invalidId;
    }

    await user.addRole(role);
  }

  async revoke(userId, roleId) {
    const [user, role] = await Promise.all([
      this.repository.findById(userId),
      this.rolesRepository.findById(roleId),
    ]);

    if (!user || !role) {
      throw this.errors.invalidId;
    }

    await user.removeRole(role);
  }
}

module.exports = UsersService;
