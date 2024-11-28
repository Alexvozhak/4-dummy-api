import axios, { AxiosResponse, isAxiosError } from "axios";

enum StatusText {}

enum Gender {}

enum BloodGroup {}

enum Color {}

enum HairType {}

enum Country {}

enum State {}

enum City {}

enum CardType {}

enum Currency {}

enum Department {}

enum Coin {}

enum Network {}

enum Role {}

interface SuccessResponse {
  status: number;
  statusText: StatusText;
  headers: {};
}

interface Address {
  address: string;
  city: City;
  state: State;
  stateCode: string;
  postalCode: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: Country;
}

interface Bank {
  cardExpire: string;
  cardNumber: number;
  cardType: CardType;
  currency: Currency;
  iban: string;
}

interface Company {
  department: Department;
  name: string;
  title: string;
  address: Address;
}

interface Crypto {
  coin: Coin;
  wallet: string;
  network: Network;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: Date;
  image: string;
  bloodGroup: BloodGroup;
  height: number;
  weight: number;
  eyeColor: Color;
  hair: {
    color: Color;
    type: HairType;
  };
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: Role;
}

interface SuccessResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

function isSuccessResponse(response: any): response is SuccessResponse {
  const requiredKeys = ["users", "total", "skip", "limit"];
  return (
    response &&
    requiredKeys.every((key) => key in response) &&
    Array.isArray(response.users)
  );
}

axios
  .get("https://dummyjson.com/users")
  .then((response: AxiosResponse<any>) => {
    if (isSuccessResponse(response.data)) {
      console.log(response.data.users);
    } else console.log("Неизвестная структура ответа: ", response.data);
  })
  .catch((error: unknown) => {
    if (isAxiosError(error)) console.log(error.response ?? error.message);
    else if (error instanceof Error) console.log(error.message);
    else console.log("Неизвестная ошибка: ", error);
  })
  .finally(() => {});
