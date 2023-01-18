import {
    IUserLogin,
    IUserUpdate,
} from '../../../interfaces/user/userInterface';

const mockedPosts = [
    {
        id: '1',
        image: 'https://source.unsplash.com/random',
        title: 'Mamadeiras',
        text: 'As mamadeiras são essenciais para alimentar os bebês. Existem diferentes tipos de mamadeiras que variam em termos de materiais, forma e tamanho. Algumas mamadeiras são feitas de vidro e são geralmente mais leves e resistentes a arranhões. Outras mamadeiras são feitas de plástico, o que significa que são mais leves e menos propensas a quebrar. Algumas mamadeiras têm bicos largos e arredondados, enquanto outras têm bicos estreitos e pontiagudos. Algumas mamadeiras são mais adequadas para bebês mais novos e outras para bebês mais velhos. É importante escolher a mamadeira certa para o seu bebê, pois cada uma tem diferentes características que podem contribuir para a saúde e segurança do bebê.',
    },
    {
        id: '2',
        image: 'https://source.unsplash.com/random',
        title: 'Carrinhos',
        text: 'Carrinhos de bebê são essenciais para os pais aproveitarem momentos juntos com seus bebês. Eles ajudam a transportar os pequenos a lugares seguros e confortáveis, mantendo a máxima segurança. Além disso, eles são projetados para fornecer ao bebê o máximo de conforto e estimulação visual. Os carrinhos de bebê oferecem aos pais tudo o que eles precisam para cuidar de seus bebês, desde cadeiras confortáveis e acessórios de segurança até compartimentos para guardar todos os itens essenciais. Os carrinhos de bebê são essenciais para qualquer família com filhos pequenos.',
    },
    {
        id: '3',
        image: 'https://source.unsplash.com/random',
        title: 'Introdução Alimentar',
        text: 'Introdução alimentar é um processo importante para os bebês, pois é a introdução de alimentos sólidos para complementar a amamentação. Deve ser iniciada entre 4 e 6 meses de idade, quando o bebê já estiver pronto para se sentar com apoio e puxar objetos para a boca. Os alimentos iniciais para o bebê devem ser alimentos ricos em nutrientes, como frutas, legumes, cereais e carnes magras. No início, os alimentos devem ser preparados de forma purê ou processados em liquidificador, pois é mais fácil para o bebê mastigar. Além disso, é importante oferecer água ao bebê para ajudá-lo a se adaptar a novos sabores e texturas. Seguir as recomendações dos profissionais de saúde e pesquisar os alimentos recomendados para bebês é a melhor maneira de garantir que o seu bebê desenvolva hábitos alimentares saudáveis.',
    },
];

const mockedPost1 = {
    id: '1',
    image: 'https://source.unsplash.com/random',
    title: 'Mamadeiras',
    text: 'As mamadeiras são essenciais para alimentar os bebês. Existem diferentes tipos de mamadeiras que variam em termos de materiais, forma e tamanho. Algumas mamadeiras são feitas de vidro e são geralmente mais leves e resistentes a arranhões. Outras mamadeiras são feitas de plástico, o que significa que são mais leves e menos propensas a quebrar. Algumas mamadeiras têm bicos largos e arredondados, enquanto outras têm bicos estreitos e pontiagudos. Algumas mamadeiras são mais adequadas para bebês mais novos e outras para bebês mais velhos. É importante escolher a mamadeira certa para o seu bebê, pois cada uma tem diferentes características que podem contribuir para a saúde e segurança do bebê.',
};
const mockedPost2 = {
    id: '2',
    image: 'https://source.unsplash.com/random',
    title: 'Carrinhos',
    text: 'Carrinhos de bebê são essenciais para os pais aproveitarem momentos juntos com seus bebês. Eles ajudam a transportar os pequenos a lugares seguros e confortáveis, mantendo a máxima segurança. Além disso, eles são projetados para fornecer ao bebê o máximo de conforto e estimulação visual. Os carrinhos de bebê oferecem aos pais tudo o que eles precisam para cuidar de seus bebês, desde cadeiras confortáveis e acessórios de segurança até compartimentos para guardar todos os itens essenciais. Os carrinhos de bebê são essenciais para qualquer família com filhos pequenos.',
};
const mockedPost3 = {
    id: '3',
    image: 'https://source.unsplash.com/random',
    title: 'Introdução Alimentar',
    text: 'Introdução alimentar é um processo importante para os bebês, pois é a introdução de alimentos sólidos para complementar a amamentação. Deve ser iniciada entre 4 e 6 meses de idade, quando o bebê já estiver pronto para se sentar com apoio e puxar objetos para a boca. Os alimentos iniciais para o bebê devem ser alimentos ricos em nutrientes, como frutas, legumes, cereais e carnes magras. No início, os alimentos devem ser preparados de forma purê ou processados em liquidificador, pois é mais fácil para o bebê mastigar. Além disso, é importante oferecer água ao bebê para ajudá-lo a se adaptar a novos sabores e texturas. Seguir as recomendações dos profissionais de saúde e pesquisar os alimentos recomendados para bebês é a melhor maneira de garantir que o seu bebê desenvolva hábitos alimentares saudáveis.',
};

const mockedLoginUser: IUserLogin = {
    email: 'sakurakawaii@mail.com',
    password: 'mahoushoujo1',
};

const mockedUpdatedBodyPost: IUserUpdate = {
    name: 'JoJo',
    password: 'stonefree6',
};

export {
    mockedPosts,
    mockedPost1,
    mockedPost2,
    mockedPost3,
    mockedUpdatedBodyPost,
    mockedLoginUser,
};
