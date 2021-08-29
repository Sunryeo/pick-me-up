import styles from './Myinfo.module.css';

import React, { useState } from 'react';
import MyinfoModify from '../myinfoModify/MyinfoModify';
import MypageModifyNull from '../MypageModifyNull';

const Myinfo = ({info,setInfo}) => {
    if(info){  
        const {userid, nickname, mobile} = info;
    }
  
    /* 내정보수정이동*/
    const [isModifyClicked, setIsModifyClicked] = useState(false);
    //수정하기 버튼 클릭시 이동 
    const handleClickModify = () => {
        setIsModifyClicked(true);
    }

    return(
        <>
         {isModifyClicked=== false ?

        <>
            <div className={styles.infobox}>
                <div className={styles.imgbox}>
                    <span className={styles.imgborder}>
                        <img src="../../../images/face.svg" className={styles.faceimg}></img>
                    </span>
                </div>
                <div className={styles.textbox}>
                    <div className={styles.ulbox}>
                        <span className={styles.list}>
                        아이디:
                        {info === null ?
                              <input className={styles.input} value="info없는경우" readOnly></input> 
                                : <input className={styles.input} value={info.userid} readOnly></input>
                        }
                        </span>
                        <span className={styles.list}>
                            닉네임:
                            {info === null ?
                              <input className={styles.input} value="수정버튼/취소버튼 막기" readOnly></input> 
                                :  <input className={styles.input} value={info.nickname} readOnly></input>
                            }
                        </span>
                        <span className={styles.list}>
                            모바일:
                            {info === null ?
                              <input className={styles.input} value="nullpage띄우기" readOnly></input> 
                                :  <input className={styles.input} value={info.mobile} readOnly></input>
                            }
                            
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.btns}>
                <button className={styles.btn}>회원탈퇴(optional)</button>
                <button className={styles.btn} 
                        onClick={handleClickModify} 
                        isModifyClicked={isModifyClicked}
                        setIsModifyClicked={setIsModifyClicked}>수정하기
                </button>
            </div>
        </>
        :
        <>
        {
           
        info ?
            <MyinfoModify 
            isModifyClicked={isModifyClicked} 
            setIsModifyClicked={setIsModifyClicked}
            info={info} 
            setInfo={setInfo}/>
        : <MypageModifyNull />   
        
        }
        </>

        }

       </>
       
    );
}

export default Myinfo;