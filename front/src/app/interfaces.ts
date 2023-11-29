export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  role: string;
}

export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
}
export interface ClientDTO {
  id: number;
  name: string;
  email: string;
}

export interface ProjectDTO {
  id?: number;
  client: ClientDTO;
  admin?: UserDTO;
  designer: UserDTO;
  made?: boolean;
  name: string;
  link: string;
  address: string;
  square: string;
}

export interface StatusDTO {
  id: number;
  status: string;
  statusdate: Date;
  project: ProjectDTO;
}
export interface BillDTO{
  id: number;
  amount: number;
  project:  ProjectDTO;
}
