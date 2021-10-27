

export type ITaskType = {
    id: string;
    completed:boolean;
    title: string;
    description: string;
    deadline: string;
    tag: {
        id: string;
        name: string;
        color: string;
        bg: string;
    }
};
