
export const ADD_SINGLE_RECORD = 'ADD_SINGLE_RECORD';
export const ADD_SINGLE_META = 'ADD_SINGLE_META';
export const ADD_GROUP_RECORD = 'ADD_GROUP_RECORD';

export const state = () => {
  return {
      recordList: {
        /* 'single-1_3': {
              meta: { ... },
              list: [
                {
                  key: Date.now(),
                  id: id,
                  msg: payload.msg,
                  isSelf: false
                }
              ]
            }
        */ 

        /* 'roomName': {
              list: [
                {
                  key: Date.now(),
                  id: id,
                  msg: payload.msg,
                  isSelf: false
                }
              ]
            } 
         */
      }
  };
};

export const mutations = {
  [ADD_SINGLE_RECORD](state, record) {
    state.recordList = {
      ...state.recordList,
      ...record
    };
  },
  [ADD_SINGLE_META](state, record) {
    state.recordList = {
      ...state.recordList,
      ...record
    }
  },
  [ADD_GROUP_RECORD](state, record) {
    state.recordList = {
      ...state.recordList,
      ...record
    }
  }
};

export const actions = {
  addSingleRecord({ commit, state }, { record }) {
    const { id, targetId } = record;
    // console.log('id, targetId',id, targetId);
    const key = 'single-' + [ id, targetId ].sort().join('_');
    const targetRecord = state.recordList[key] || {
      meta: {},
      list: []
    };
    targetRecord.list.push(record);
    commit(ADD_SINGLE_RECORD, { 
      [key]: {
        ...targetRecord
      }
    });
  },
  // 添加会话原信息
  addSingleMeta({ commit, state }, { meta = {} }) {
    const key = Object.keys(meta).sort().join('_');
    if(!key) return;
    const targetRecord = state.recordList[`single-${key}`] || {
      meta,
      list: []
    }
    commit(ADD_SINGLE_META, {
      [`single-${key}`]: {
        ...targetRecord
      }
    })
  },
  // 新增群聊记录
  addGroupRecord({ commit, state }, { record }) {
    const { id, room } = record;
    const targetRecord = state.recordList[room] || { 
      meta: {},
      list: []
    }
    targetRecord.list.push(record);
    commit(ADD_GROUP_RECORD, {
      [room]: {
        ...targetRecord
      }
    })
  },
  // 删除聊天记录
  clearChatList({ commit, state }, { id, target, isSingle }) {
    const key = isSingle ? 'single-' + [ id, targetId ].sort().join('_') : target;
    const targetRecord = state.recordList[key];
    if (!targetRecord) {
      return 
    };
    targetRecord.list = [];
    commit(ADD_GROUP_RECORD, {
      [key]: {
        ...targetRecord
      }
    })
  }
};