import {
    IUserLogin,
    IUserRequest,
    IUserResponse,
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

const mockedUser: IUserRequest = {
    image: 'https://source.unsplash.com/random',
    name: 'Sakura Kinomoto',
    email: 'sakurakawaii@mail.com',
    password: 'mahoushoujo1',
    contact: '85995130224',
    register: '12682833754',
    isStore: false,
};

const mockedUserDelete: IUserRequest = {
    image: 'https://source.unsplash.com/random',
    name: 'Sakura',
    email: 'sakura@mail.com',
    password: '123456789',
    contact: '85995130000',
    register: '10000000000',
    isStore: false,
};

const mockedLoginUserDelete: IUserLogin = {
    email: 'sakura@mail.com',
    password: '123456789',
};

const mockedUserReponse: Omit<IUserResponse, 'id' | 'createdAt' | 'updatedAt'> =
    {
        image: 'https://source.unsplash.com/random',
        name: 'Sakura Kinomoto',
        email: 'sakurakawaii@mail.com',
        contact: '85995130224',
        register: '12682833754',
        isStore: false,
        isActive: true,
    };

const mockedLoginUser: IUserLogin = {
    email: 'sakurakawaii@mail.com',
    password: 'mahoushoujo1',
};

const mockedUpdatedBodyUser: IUserUpdate = {
    name: 'JoJo',
    password: 'stonefree6',
};

const mockedCreateNotUserResponse = {
    error: [
        'image is a required field',
        'name is a required field',
        'isStore is a required field',
    ],
};

const mockedCreateNotUserRequest: Omit<
    IUserRequest,
    'name' | 'isStore' | 'image'
> = {
    email: 'sddsHeroku@gmail.com',
    password: 'sdds123',
    contact: '40028922',
    register: '1654645',
};

const mockedCreateUser: IUserRequest = {
    image: 'fotinha',
    name: 'SddsHeroku',
    email: 'SddsHeroku@gmail.com',
    password: '123456',
    contact: '1234',
    register: 'fisico',
    isStore: false,
};

export {
    mockedListUsers,
    mockedUpdatedBodyUser,
    mockedLoginUser,
    mockedUser,
    mockedUserReponse,
    mockedCreateNotUserResponse,
    mockedCreateNotUserRequest,
    mockedUserDelete,
    mockedLoginUserDelete,
    mockedCreateUser,
};
