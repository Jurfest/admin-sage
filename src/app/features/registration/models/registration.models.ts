export interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  cpf: string;
  phoneNumber: string;
}

export interface ResidentialInfo {
  address: string;
  neighborhood: string;
  zipCode: string;
  city: string;
  state: string;
}

export interface ProfessionalInfo {
  occupation: string;
  company: string;
  salary: number;
}

export interface ZipCodeResponse {
  address: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Occupation {
  id: string;
  name: string;
}