import styled from "styled-components";

export const HeaderWrapper = styled.div`
    height: 75px;
    color: #ffff;
    background-color: #242424;

    .content {
        height: 70px;
        
        display: flex;
        justify-content: space-between;
    }

    .divider {
        height: 5px;
        background-color: #C20C0C;
    }
`

export const HeaderLeft = styled.div`
    display: flex;
    font-size: 14px;

    .logo {
        display: block;
        width: 176px;
        height: 69px;
        background-position:0 0;
        text-indent: -9999px;
    }
    .wangYi {
        font-weight: 700;
        font-size: 30px;
        text-align:center center;
    }

    .select-list {
        display: flex;
        /* 使文字上下居中 */
        line-height: 70px;

        .select-item {
            /* 这里是相对定位 */
            position: relative; 
            a {
                display: block;
                padding: 0 20px;
                color: #ccc;
            }
            
            /* 结构伪类：找到最后一个元素 */
            :last-of-type a {
                /* a元素做相对定位 */
                position: relative;
                /*伪元素  */
                :after {
                    /* 绝对定位 */
                    position: absolute;
                    content: "";
                    width: 28px;
                    height: 19px;
                    top: 20px;
                    right: -15px;
                    background-position:-190px 0;
                    /* 引入精灵图的时候通过require引入 */
                    background-image: url(${require("@/assets/img/sprite_01.png")})
                }
            }

            &:hover a, a.active {
                color: #fff;
                background: #000;
                text-decoration: none;
            }        

            .active .icon {
                position: absolute;
                display: inline-block;
                width: 12px;
                height: 7px;
                bottom: -1px;
                left: 50%;
                transform: translate(-50%, 0);
                background-position: -226px 0;
            }
            
        }
    }
`
export const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    color: #ccc;
    font-size: 12px;

    .search {
        width: 158px;
        height: 32px;
        border-radius: 10px;

        input {
            margin: 2px 0;
            &::placeholder {
                font-size: 12px;
            }
        }
    }

    .center {
        width: 80px;
        height:32px;
        line-height: 32px;
        text-align: center;
        border: 1px solid #666;
        border-radius: 16px;
        margin-left: 10px;
        /* 背景颜色设置为透明色 */
        background-color: transparent;
    }

    .login {
        background-color: transparent;
        margin: 5px;
        color: white;
    }
`