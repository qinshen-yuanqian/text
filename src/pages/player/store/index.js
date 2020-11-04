//在index.js中进行统一的导入导出
import reducer from './reducer';
import {
    getSongDetailAction
} from './actionCreators';

export {
    reducer,
    getSongDetailAction
}


//在大的reducer里面进行合并