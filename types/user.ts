export type Tokens = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
};

export type UserInfo = {
  username: string;
  attributes: { Name: string; Value: string }[];
};

export type User = {
  user: UserInfo;
  tokens: Tokens;
};
