type onboardingSwiperDataType = {
    id: number
}

type Avatar = {
    public_id: string;
    url: string;
}

type User = {
    _id: string;
    name: string;
    email: string;
    avatar?: Avatar;
    password?: string;
    courses: any;
    createdAt: Date;
    updatedAt: Date;
};

