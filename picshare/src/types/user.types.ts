export type UserSignInType = {
    email: string,
    password: string
};
export type UserSignUpType = {
    fullName: string,
    email: string,
    password: string
};
export type UserType = {
    id: number;
    fullName: string;
    email: string;
    profilePictureUrl?: string;
}

export type UserUpdateType = {
    fullName?: string;
    password?: string;
    profilePicture?: File;
}
