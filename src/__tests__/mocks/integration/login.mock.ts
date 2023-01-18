import {
  IUserLogin,
  IUserRequest,
} from '../../../interfaces/user/userInterface';

const mockedRouterLoginUser: IUserRequest = {
  image: 'lalalala',
  name: 'Querido Heroko',
  email: 'herokologin@gmail.com',
  password: '123456',
  contact: '40028922',
  register: '9999999',
  isStore: false,
};

const mockedRouterLogin: IUserLogin = {
  email: 'herokologin@gmail.com',
  password: '123456',
};

const mockedRouterLoginincorrect: IUserLogin = {
  email: 'herokologinSdds@gmail.com',
  password: '123456',
};

export { mockedRouterLogin, mockedRouterLoginincorrect, mockedRouterLoginUser };
