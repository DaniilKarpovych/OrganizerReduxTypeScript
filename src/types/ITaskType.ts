

export type ITaskType = {
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
    key?: number;
};
