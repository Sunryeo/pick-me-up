import styles from './Myinfo.module.css';

import React, { useState } from 'react';
import MyinfoModify from '../myinfoModify/MyinfoModify';

const Myinfo = (props) => {


    /* 내정보수정이동*/
    const [isModifyClicked, setIsModifyClicked] = useState(false);
    const [info, setInfo] = useState({
        '1':{
            id: "",
            nickname: "",
            mobile: "",
            password: "",
            passwordConfirm: "",
        }
    })



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
                            <input className={styles.input} value="tkdkagody" readOnly></input>
                        </span>
                        <span className={styles.list}>
                            닉네임:
                            <input className={styles.input} value="pickme" readOnly></input>
                        </span>
                        <span className={styles.list}>
                            모바일:
                            <input className={styles.input} value="010-0000-0000" readOnly></input>
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
        <MyinfoModify 
        isModifyClicked={isModifyClicked} 
        setIsModifyClicked={setIsModifyClicked}
        info={info} 
        setInfo={setInfo}/>
        }

       </>
       
    );
}

export default Myinfo;