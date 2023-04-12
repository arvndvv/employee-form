export interface IEmployee {
  id: number,
  name: string,
  dob: Date,
  email: string,
  number: number,
  salary: number,
  gender: string,
}
export enum EGender {
  male = 'male',
  female = 'female',
  other = 'other'
}
