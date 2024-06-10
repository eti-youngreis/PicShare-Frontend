export type UserSignInType = {
    email: string,
    password: string
};
export type FullUserType = {
    profileImage?:File,
    profileImagePath?:string,
    id?: number,
    fullName: string,
    email: string,
    password: string
};
export type UserType = {
    id: number,
    fullName: string,
    email:string,
    profileImagePath?:string
}
export type UserUpdate = {
    fullName?:string,
    profileImage?:File
}