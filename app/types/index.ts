export type User = {
  id: String | number;
  email: String;
  password: String;
  name: String;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
  projectId: string;
};
