type User = {
  id: string;
  username: string;
  password: string;
};

const users: User[] = [];

export async function userExists(username: string): Promise<boolean> {
  return users.some(user => user.username === username);
}

export async function registerUser(username: string, password: string): Promise<User> {
  const user: User = { id: String(users.length + 1), username, password };
  users.push(user);
  return user;
}

export async function getUserById(id: string): Promise<User | undefined> {
  return users.find(user => user.id === id);
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  return users.find(user => user.username === username);
}
