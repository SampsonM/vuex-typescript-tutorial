import { GetterTree, MutationTree, ActionTree, Module } from 'vuex';
import { TodoState, Todo, RootState } from '../types';

type TodoGetter = GetterTree< TodoState, RootState>;

const TodoState: TodoState = {
  todos: [
    { id: 0, text: 'buys milks', checked: true },
    { id: 1, text: 'buys hair', checked: true },
    { id: 2, text: 'buys nuts', checked: true },
  ],
};

const getters: TodoGetter = {
  // Params => (state, getters, rootState, rootGetters)
  todos: (state) => state.todos.filter((todo: any) => !todo.checked),
  doneTodos: (state) => state.todos.filter((todo: any) => todo.checked),
};

const mutations: MutationTree< TodoState> = {
  addTodo(state, newTodo) {
    // Must create a copy to prevent unwanted two way binding happening
    const todo = {...newTodo};

    state.todos.push(todo);
  },
  toggleTodo(state, todo) {
    state.todos.forEach((t) => {
      if (t.id === todo.id) {
        t.checked = !t.checked;
      }
    });
  },
};

const actions: ActionTree< TodoState, RootState> = {
  async addTodoAsync({ commit, rootState }, payload) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + payload);

    const data = await response.json();

    const todo: Todo = {
      text: rootState.login.user + ' ' + data.title,
      checked: false,
      id: rootState.todos.todos.length,
    };

    commit('addTodo', todo);
  },
};

export const todos: Module< TodoState, RootState> = {
  namespaced: true,
  state: TodoState,
  getters,
  mutations,
  actions,
};
