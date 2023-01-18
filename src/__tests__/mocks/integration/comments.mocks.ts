import { IUserLogin } from "../../../interfaces/user/userInterface";

const mockedListComments = [
    {
		comments_id: "898377c7-1e12-4e3a-93cf-f79705fba05f",
		comments_text: "Cadê você Heroku?",
		comments_createdAt: "2023-01-18T15:23:57.379Z",
		comments_updatedAt: "2023-01-18T15:23:57.379Z",
		comments_deletedAt: null,
		comments_userId: "aa8a1658-cc41-4a36-a764-a5d9dfedeee4",
		id_post: "1"
	},
	{
		comments_id: "01956be1-ffa1-4856-8226-aa702c279e57",
		comments_text: "Cadê você Heroku?",
		comments_createdAt: "2023-01-18T15:23:58.236Z",
		comments_updatedAt: "2023-01-18T15:23:58.236Z",
		comments_deletedAt: null,
		comments_userId: "aa8a1658-cc41-4a36-a764-a5d9dfedeee4",
		id_post: "1"
	},
	{
		comments_id: "593333c5-ffbb-42d1-a2ba-f69f3ad6a402",
		comments_text: "Cadê você Heroku?",
		comments_createdAt: "2023-01-18T15:24:04.266Z",
		comments_updatedAt: "2023-01-18T15:24:04.266Z",
		comments_deletedAt: null,
		comments_userId: "aa8a1658-cc41-4a36-a764-a5d9dfedeee4",
		id_post: "1"
	}
]

const mockedCommentRequest = {
    text: "boa noite"
}

const mockedComment = {
		comments_id: "898377c7-1e12-4e3a-93cf-f79705fba05f",
		comments_text: "Cadê você Heroku?",
		comments_createdAt: "2023-01-18T15:23:57.379Z",
		comments_updatedAt: "2023-01-18T15:23:57.379Z",
		comments_deletedAt: null,
		comments_userId: "aa8a1658-cc41-4a36-a764-a5d9dfedeee4",
		id_post: "1"
}


const mockedLoginCommentUser: IUserLogin = {
    email: 'SddsHeroku@gmail.com',
    password: '123456',
};

export { mockedListComments, mockedLoginCommentUser, mockedComment, mockedCommentRequest }