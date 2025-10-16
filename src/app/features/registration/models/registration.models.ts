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

export type ZipCodeResponse = Omit<ResidentialInfo, 'zipCode'>;

export interface ZipCodeApiResponse {
  success: boolean;
  timestamp: string;
  zipcode: string;
  data: ZipCodeResponse;
  metadata: {
    source: string;
    version: string;
  };
}

export interface Occupation {
  id: string;
  name: string;
  icon?: string;
}

export interface Registration {
  personal: PersonalInfo;
  residential: ResidentialInfo;
  professional: ProfessionalInfo;
}
