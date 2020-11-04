import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { HeaderWrapper } from './style';
const HYThemeHeaderRCM = memo(function(props) {
    const { title,keywords=[] } = props;  //当keywords为undifined的时候，可以将默认值[],赋值给keywords

    return (
        <HeaderWrapper className="sprite_02">
            <div className="left">
                <div className="title">{title}</div>
                <div className="keyword">
                    {
                        keywords.map((item, index) => {
                            return (
                                <div className="item" key={item}>
                                    <a href="todo">{item}</a>
                                    <span className="divider">|</span>
                                    {/* 最后一个元素没有竖线 */}
                                </div>
                            )
                        })
                    }
                </div>  
            </div>
            <div className="right">
                <a href="todo">更多</a>
                <i className="icon sprite_02"></i>
            </div>
            
        </HeaderWrapper>
    )
})

// PropTypes对组件传过来的参数进行校验
HYThemeHeaderRCM.propTypes = {
    title: PropTypes.string.isRequired,   //title是必传参数
    keywords: PropTypes.array
}

//设置传入参数的默认值
HYThemeHeaderRCM.defaultProps = {
    keywords: []
}
export default HYThemeHeaderRCM;
