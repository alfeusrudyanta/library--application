type UserProfile = {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

type AuthResponse = {
  token: string;
  user: UserProfile;
};

type PostAuthRegisterReq = {
  name: string;
  email: string;
  password: string;
};

type PostAuthRegisterRes = {
  success: boolean;
  message: string;
  data: UserProfile;
};

type PostAuthLoginReq = {
  email: string;
  password: string;
};

type PostAuthLoginRes = {
  success: boolean;
  message: string;
  data: AuthResponse;
};

export type {
  PostAuthRegisterReq,
  PostAuthRegisterRes,
  PostAuthLoginReq,
  PostAuthLoginRes,
  UserProfile,
};
