interface Task {
   title: string;
   time: string;
   difficulty: number;
   isCompleted: number;
}

interface GroupedTasks {
   [difficulty: number]: Omit<Task, "difficulty">[];
}

interface iTaskList {
   tasks: Task[];
}
