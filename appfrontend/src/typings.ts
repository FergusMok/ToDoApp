// Following the code style of Typescript team. See : https://github.com/Microsoft/TypeScript/blob/master/src/compiler/types.ts
import { RouteComponentProps } from "react-router-dom";

export interface userDetails {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
}

export interface tagOptionsObjectInterface {
  key: string;
  text: string;
  value: string;
}

export interface sortOptionObjectInterface {
  key: string;
  text: string;
  value: boolean | string;
}

export interface SpinnerProps {
  text: string;
}

export interface completeItem {
  id: string;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  completed: boolean;
  user_id: number;
  due_date: string;
  tag_list: Array<string>;
}

export interface itemForSubmission {
  title: string;
  body: string;
  user_id: string;
  due_date: string;
  tag_list: string; // Ruby can only take the string.
}

//// Different versions of items
export interface ToDoItemProps {
  item: completeItem;
}

export interface ExistingItem {
  id: string;
}

export interface MatchProps extends RouteComponentProps<ExistingItem | undefined> {}

export interface EmptyMatchProps {
  match: RouteComponentProps["match"];
}

export interface computedMatch {
  params: RouteComponentProps["match"]["params"];
  path: RouteComponentProps["match"]["path"];
  url: RouteComponentProps["match"]["url"];
  isExact: boolean;
}

export interface AuthenticationRouteProp {
  component: () => JSX.Element;
  path: string;
  exact: boolean;
}

export interface reduxAction {
  type: string;
  payload?: number | completeItem[] | string[] | string | boolean;
}
