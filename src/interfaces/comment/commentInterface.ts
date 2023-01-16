export interface IComment {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ICommentRequest {
  text: string;
}

export interface ICommentResponse {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICommentResp {
  id: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ICommentUpdate {
  text?: string;
}

export interface ICommentFromPost {
  id: string,
  text: string
}
