import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { BookRepository } from '../repositories/bookRepository';

jest.mock('../services/authService');
jest.mock('../repositories/bookRepository');

const mockRequest = (body: object): Request => ({
  body,
} as Request);

const mockResponse = (): Response => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe('Controllers', () => {
  describe('Auth Controllers', () => {
    it('should register a user', async () => {
      const req = mockRequest({ name: 'User', email: 'test@example.com', password: 'password' });
      const res = mockResponse();
      (AuthService.prototype.registerUser as jest.Mock).mockResolvedValue({ id: 1, name: 'User' });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'User' });
    });

    it('should return error on register failure', async () => {
      const req = mockRequest({ name: 'User', email: 'test@example.com', password: 'password' });
      const res = mockResponse();
      (AuthService.prototype.registerUser as jest.Mock).mockRejectedValue(new Error('Registration failed'));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Registration failed' });
    });

    it('should login a user', async () => {
      const req = mockRequest({ email: 'test@example.com', password: 'password' });
      const res = mockResponse();
      (AuthService.prototype.loginUser as jest.Mock).mockResolvedValue({ id: 1, email: 'test@example.com' });

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
    });

    it('should return error on login failure', async () => {
      const req = mockRequest({ email: 'test@example.com', password: 'wrongpassword' });
      const res = mockResponse();
      (AuthService.prototype.loginUser as jest.Mock).mockRejectedValue(new Error('Login failed'));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Login failed' });
    });
  });

  describe('Book Controllers', () => {
    it('should get all books', async () => {
      const req = mockRequest({});
      const res = mockResponse();
      (BookRepository.prototype.getAllBooks as jest.Mock).mockResolvedValue([{ title: 'Book 1' }]);

      await getAllBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{ title: 'Book 1' }]);
    });

    it('should add a book', async () => {
      const req = mockRequest({ title: 'New Book', author: 'Author', price: 20 });
      const res = mockResponse();
      (BookRepository.prototype.addBook as jest.Mock).mockResolvedValue({ id: 1, title: 'New Book' });

      await addBook(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, title: 'New Book' });
    });
  });
});