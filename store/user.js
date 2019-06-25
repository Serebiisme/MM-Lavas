export const SET_USER_INFO = 'SET_USER_INFO';

export const state = () => {
  return {
      user: {}
  };
};

export const mutations = {
  [SET_USER_INFO](state, { user }) {
      console.log('mutataions-->', user);
      state.user = {
          ...state.user,
          ...user
      };
  }
};

export const actions = {
  setUser({commit}, user) {
    console.log('user',user)
    const chater = user ? user.chater : {}
    commit(SET_USER_INFO, { 
      user: {
        ...user,
        ...chater
      }
    });
  }
};
