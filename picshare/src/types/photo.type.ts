
export type PhotoType = {
    id: number,
    userId: number,
    url: string,
}

export type PhotoUploadType = {
    photo: Blob,
    userId: number
}
