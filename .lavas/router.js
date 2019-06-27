import Vue from 'vue';
import Router from 'vue-router';

    
import _15616491415259d49a922ebc8a6d77ca82c0a74289b98 from '@/pages/Appshell.vue';
    

    
import _15616491415257097f0e77581afbd3a15b7a054aff7d5 from '@/pages/Bind.vue';
    

    
import _1561649141525c4ec2bcd7cf76d381c9d513c3a7bcb45 from '@/pages/Chat.vue';
    

    
import _1561649141525d2462dcf0c7beccd286c658e08187914 from '@/pages/Error.vue';
    

    
import _15616491415259ca4a7f6f3afc0d639a52df01f8a576d from '@/pages/Extra.vue';
    

    
import _156164914152567830448037326425509e44bce7632b7 from '@/pages/Index.vue';
    

    
import _156164914152759b6f18dcdf963759203259ebb344b4b from '@/pages/index/Contact.vue';
    

    
import _156164914152769af8b261b3c2871c7c89a4b4cd3726f from '@/pages/index/Index.vue';
    

    
import _1561649141527e7371594a01dde92d8c5deeacd0f2ce4 from '@/pages/index/Live.vue';
    

    
import _15616491415272db6380d327d7d354be791582c75f521 from '@/pages/index/Mine.vue';
    

    
import _15616491415251c344d083993d726b6efda48972bfdff from '@/pages/Login.vue';
    

    
import _1561649141525396f69304aad44d4e2289f1a75d66ab1 from '@/pages/Register.vue';
    

    
import _1561649141525c8312f04c3cf303566b838528b201685 from '@/pages/socket/_id.vue';
    


let routes = [
    {
        "path": "/appshell",
        "component": _15616491415259d49a922ebc8a6d77ca82c0a74289b98,
        "meta": {},
        "name": "appshell"
    },
    {
        "path": "/bind",
        "component": _15616491415257097f0e77581afbd3a15b7a054aff7d5,
        "meta": {
            "requiresAuth": false
        },
        "name": "bind"
    },
    {
        "path": "/chat",
        "component": _1561649141525c4ec2bcd7cf76d381c9d513c3a7bcb45,
        "meta": {},
        "name": "chat"
    },
    {
        "path": "/extra",
        "component": _15616491415259ca4a7f6f3afc0d639a52df01f8a576d,
        "meta": {},
        "name": "extra"
    },
    {
        "path": "/",
        "component": _156164914152567830448037326425509e44bce7632b7,
        "meta": {},
        "children": [
            {
                "path": "contact",
                "component": _156164914152759b6f18dcdf963759203259ebb344b4b,
                "meta": {},
                "name": "indexContact"
            },
            {
                "path": "",
                "component": _156164914152769af8b261b3c2871c7c89a4b4cd3726f,
                "meta": {},
                "name": "index"
            },
            {
                "path": "live",
                "component": _1561649141527e7371594a01dde92d8c5deeacd0f2ce4,
                "meta": {},
                "name": "indexLive"
            },
            {
                "path": "mine",
                "component": _15616491415272db6380d327d7d354be791582c75f521,
                "meta": {},
                "name": "indexMine"
            }
        ]
    },
    {
        "path": "/login",
        "component": _15616491415251c344d083993d726b6efda48972bfdff,
        "meta": {
            "requiresAuth": false
        },
        "name": "login"
    },
    {
        "path": "/register",
        "component": _1561649141525396f69304aad44d4e2289f1a75d66ab1,
        "meta": {
            "requiresAuth": false
        },
        "name": "register"
    },
    {
        "path": "/socket/:id",
        "component": _1561649141525c8312f04c3cf303566b838528b201685,
        "meta": {},
        "name": "socketId"
    },
    {
        "path": "/error",
        "component": _1561649141525d2462dcf0c7beccd286c658e08187914,
        "meta": {},
        "name": "error",
        "alias": "*"
    }
];

Vue.use(Router);


/**
 * to 如果在这个列表中，始终采用从左到右的滑动效果，首页比较适合用这种方式
 *
 * @type {Array.<string>}
 * @const
 */
const ALWAYS_BACK_PAGE = ["login"];

/**
 * to 如果在这个列表中，始终采用从右到左的滑动效果
 *
 * @type {Array.<string>}
 * @const
 */
const ALWAYS_FORWARD_PAGE = [];

/**
 * 历史记录，记录访问过的页面的 fullPath
 *
 * @type {Array.<string>}
 */
let HISTORY_STACK = [];

/**
 * 用于存储历史记录到localStorage的key
 *
 * @type {String}
 * @const
 */
const LAVAS_HISTORY_ARRAY_STACK_LOCAL_KEY = 'LAVAS_HISTORY_ARRAY_STACK_LOCAL_KEY';

/**
 * 用于存储历史state记录到localStorage的key
 *
 * @type {String}
 * @const
 */
const LAVAS_HISTORY_STATE_STACK_LOCAL_KEY = 'LAVAS_HISTORY_STATE_STACK_LOCAL_KEY';

/**
 * 使用history API记录的state数组
 *
 * @type {Array}
 */
let HISTORY_STATE_STACK = [];

let supportHistory = false;

if (process.env.VUE_ENV === 'client') {

    // 是否支持history
    supportHistory = window.history && 'state' in history;

}

function getHistoryStateKey() {
    return history.state ? history.state.key : '';
}

// 存储数据到本地
function saveHistoryToLocal(key, data) {
    try {
        localStorage.setItem(key, typeof data === 'object' ? JSON.stringify(data) : data);
    }
    catch (err) {

    }
}

// 初始化history state
function initHistoryStateStack() {
    // 如果当前tab有历史条目，那么应该把之前存储的state list读取出来
    if (history.length > 1) {
        try {
            let historyState = JSON.parse(localStorage.getItem(LAVAS_HISTORY_STATE_STACK_LOCAL_KEY));
            if (historyState && historyState.length) {
                // 为了有效控制localStorage大小，每次读取时应该只读取不大于当前tab历史条目长度
                // 因为大于历史条目长度之前的记录都是过期的state，无需读取
                HISTORY_STATE_STACK = historyState.slice(-history.length);
            }
        }
        catch (err) {

        }
    }

    setTimeout(() => {
        // 首次访问的页面也要加入列表中，但要注意如果当前页面访问过（刷新）则应该替换
        if (HISTORY_STATE_STACK.length) {
            HISTORY_STATE_STACK[HISTORY_STATE_STACK.length - 1] = getHistoryStateKey();
        }
        else {
            HISTORY_STATE_STACK.push(getHistoryStateKey());
        }
    }, 300);

}

// 初始化history array
function initHistoryArrayStack(routerBase) {

    let firstPageFullPath = location.href.replace(location.origin + routerBase, '/');

    try {
        // 如果localStorage中有历史访问记录，且最新一条和当前访问的是同一个页面
        // 那应该把之前的记录也加进来，主要解决在访问过程中刷新导致history列表丢失的问题
        let historyStack = JSON.parse(localStorage.getItem(LAVAS_HISTORY_ARRAY_STACK_LOCAL_KEY));
        if (
            historyStack
            && historyStack.length
            && historyStack[historyStack.length - 1] === firstPageFullPath
        ) {
            HISTORY_STACK = historyStack;
        }
    }
    catch (err) {

    }

    // 首次访问的页面也要加入列表中
    if (HISTORY_STACK.indexOf(firstPageFullPath) === -1) {
        HISTORY_STACK.push(firstPageFullPath);
    }
}

/**
 * 用path记录判断当前是否是前进，true 表示是前进，否则是回退
 *
 * @param {Object} to 目标 route
 * @param {Object} from 源 route
 * @return {boolean} 是否表示返回
 */
function isForwardByArray(to, from) {

    // 根据 fullPath 判断当前页面是否访问过，如果访问过，则属于返回

    let index = HISTORY_STACK.indexOf(to.fullPath);
    if (index !== -1) {

        HISTORY_STACK.length = index + 1;
        return false;
    }

    return true;

}

/**
 * 用history state判断当前是否是前进，true 表示是前进，否则是回退
 *
 * @return {boolean} 是否表示返回
 */
function isForwardByHistory() {

    // 如果访问的页面state和之前访问过的页面相同，则属于返回

    let index = HISTORY_STATE_STACK.indexOf(getHistoryStateKey());

    if (index !== HISTORY_STATE_STACK.length - 1 && index !== -1) {
        HISTORY_STATE_STACK.length = index + 1;
        return false;
    }

    return true;
}

/**
 * 判断当前是否是前进，true 表示是前进，否则是回退
 *
 * @param {Object} to 目标 route
 * @param {Object} from 源 route
 * @return {boolean} 是否表示返回
 */
function isForward(to, from) {

    let res = true;

    // 使用history判断
    if (supportHistory) {
        res = isForwardByHistory();

        // 存储至localStorage
        setTimeout(() => {

            // 如果页面没访问过则把state加进来
            let pageKey = getHistoryStateKey();
            let index = HISTORY_STATE_STACK.indexOf(pageKey);
            if (res && index === -1) {

                HISTORY_STATE_STACK.push(pageKey);
            }

            saveHistoryToLocal(LAVAS_HISTORY_STATE_STACK_LOCAL_KEY, HISTORY_STATE_STACK);
        }, 300);
    }
    // 使用array判断
    else {
        res = isForwardByArray(to, from);

        if (res) {
            // 将 to.fullPath 加到栈顶
            HISTORY_STACK.push(to.fullPath);
        }

        saveHistoryToLocal(LAVAS_HISTORY_ARRAY_STACK_LOCAL_KEY, HISTORY_STACK);
    }

    // 以下属于强行更改方向系列
    // to 如果在这个列表中，始终认为是后退
    if (to.name && ALWAYS_BACK_PAGE.indexOf(to.name) !== -1) {

        res = false;
    }
    // 如果在这个列表中，始终认为是前进
    else if (to.name && ALWAYS_FORWARD_PAGE.indexOf(to.name) !== -1) {
        res = true;
    }

    return res;
}



const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};



export const keepAlivePages = routes.filter(route => route.keepAlive || route.meta.keepAlive)
                            .map(route => route.name);

export function createRouter() {
    let router = new Router({
        mode: 'history',
        base: '/',
        scrollBehavior,
        routes
    });



    
    if (process.env.VUE_ENV === 'client') {
        if (supportHistory) {
            initHistoryStateStack();
        }
        else {
            initHistoryArrayStack(router.options.base);
        }
    }
    

    router.beforeEach((to, from, next) => {
        if (router.app.$store) {
            if (router.app.$store.state.pageTransition.enable) {
                
                let effect = isForward(to, from) ? 'slide-left'
                    : 'slide-right';
                
                router.app.$store.commit('pageTransition/setType', 'slide');
                router.app.$store.commit('pageTransition/setEffect', effect);
            }
        }
        next();
    });


    return router;
}
