import { UserRepository } from '../repositories/userRepository';
import { isValidEmail, isValidName, isValidpasswordHash } from '../helpers/validationHelper';
import bcrypt from 'bcrypt'; // Importando bcrypt para hash de senha

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Método para registrar um novo usuário
  async registerUser(name: string, email: string, password: string) {
    if (!isValidName(name)) {
      throw new Error('Nome inválido');
    }
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    if (!isValidpasswordHash(password)) { // Verifica a validade da senha
      throw new Error('Senha inválida');
    }

    // Gerar um hash para a senha
    const passwordHash = await bcrypt.hash(password, 10);
    return await this.userRepository.addUser(name, email, passwordHash); // Armazenar o usuário
  }

  // Método para fazer login
  async loginUser(email: string, password: string) {
    if (!isValidEmail(email)) {
      throw new Error('Email inválido');
    }
    if (!password) {
      throw new Error('Senha não pode ser vazia');
    }

    // Recuperar o usuário pelo email
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verificar a senha
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    return user; // Retornar os dados do usuário
  }

  // Método para listar todos os usuários (opcional)
  async listUsers() {
    return await this.userRepository.getAllUsers();
  }
}