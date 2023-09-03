export interface UserModel {
    id: string
    appId: string,
    name: string,
    email: string,
    created_at: Date | any,
    isActive: boolean,
}