import {
  IUserLogin,
  IUserUpdate,
} from '../../../interfaces/user/userInterface';

const mockedListUsers = [
  {
    image: 'https://source.unsplash.com/random',
    name: 'Jolyne Kujo',
    email: 'stoneocean@gmail.com',
    password: 'stonefree123',
    contact: '81997142273',
    register: '37213020294',
    isStore: false,
  },
  {
    image: 'https://source.unsplash.com/random',
    name: 'Usagi Tsukino',
    email: 'naoeasailormoon@mail.com',
    password: 'lunaeartemis16',
    contact: '21988051506',
    register: '00776574/0001-56',
    isStore: true,
  },
  {
    image: 'https://source.unsplash.com/random',
    name: 'Sakura Kinomoto',
    email: 'sakurakawaii@mail.com',
    password: 'mahoushoujo1',
    contact: '85995130224',
    register: '12682833754',
    isStore: false,
  },
];

const mockedLoginUser: IUserLogin = {
  email: 'sakurakawaii@mail.com',
  password: 'mahoushoujo1',
};

const mockedUpdatedBodyUser: IUserUpdate = {
  name: 'JoJo',
  password: 'stonefree6',
};

export { mockedListUsers, mockedUpdatedBodyUser, mockedLoginUser };
