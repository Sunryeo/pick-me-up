import styles from './MyinfoModify.module.css';
import React, { useRef } from 'react';
import axios from 'axios';

const MyinfoModify = ({isModifyClicked,setIsModifyClicked, info, setInfo}) => {
    const idRef = useRef();
    const nicknameRef = useRef();
    const mobileRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    if(info){ 
        console.log(info)
        //패스워드랑 패스워드확인은 어떻게 상태관리할지 고민
        // setInfo({
        //     ...info, password:"", passwordConfirm:""
        // })
    }else{  //버그용
        alert("info가 없어요!")
    }

    //'수정완료 버튼' 클릭시 다시 myinfo로 이동
    const handleClickModify = ()=> {
        if(isModifyClicked){
            //axios.post()
            //성공시 클릭메소드작동
            setIsModifyClicked(false);
        }
    }
    const handleClickCancel = () => {
        if(isModifyClicked){
            setIsModifyClicked(false);
        }
    }


    //myinfo컴포 스테이트 가져와서 수정할 수 있게 만듬. 
    //=> myinfo에서 get요청해서 가져온 데이터로 myinfo채우고, 그대로 state가져와서 띄우고 
    // ++ 수정할 수 있게 해야함 현재는 ""로 뒀기 때문에 빈칸

    const onChange = (event) => {
        setInfo({
            ...info, [event.currentTarget.name] : event.currentTarget.value
        })
    }

    return(
        <>
       
        <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.infobox}>
 
            <div className={styles.imgbox}>
                <span className={styles.imgborder}>
                    <img src="../../../images/face.svg" className={styles.faceimg}></img>
                </span>
                <span className={styles.editbox}>
                    <label for="profileEdit" className={styles.editimg}>프로필사진 수정</label> 
                    <input type="file" id="profileEdit"  className={styles.editimg}></input> 
                </span>
            </div>
            <div className={styles.textbox}>
                <div className={styles.ulbox}>
                    <span className={styles.list}>
                        아이디:
                        <input 
                        type="text"
                        ref={idRef}
                        className={styles.input} value={info.userid} name="userid" onChange={onChange} autoComplete="off"></input>
                    </span>
                    <span className={styles.list}>
                        닉네임:
                        <input 
                        type="text"
                        ref={nicknameRef}
                        className={styles.input} value={info.nickname} name="nickname" onChange={onChange} autoComplete="off"></input>
                    </span>
                    <span className={styles.list}>
                        모바일:
                        <input 
                        type="text"
                        ref={mobileRef}
                        className={styles.input} value={info.mobile} name="mobile" onChange={onChange}  autoComplete="off"></input>
                    </span>
                    <span className={styles.list}>
                        비밀번호:
                        <input 
                        type="text"
                        ref={passwordRef}
                        className={styles.input} value="" name="password" onChange={onChange}  autoComplete="off"></input>
                    </span>
                    <span className={styles.passconfirm}>
                        비밀번호확인:
                        <input 
                        type="text"
                        ref={passwordConfirmRef}
                        className={styles.input} value="" name="passwordConfirm" onChange={onChange}  autoComplete="off"></input>
                    </span>
                </div>
            </div>
        </div>

        <div className={styles.btns}>
            <button className={styles.btn}
                onClick={handleClickCancel}>취소(없어도될거같음)
            </button>
            <button className={styles.btn} 
                onClick={handleClickModify}>수정완료
            </button>
        </div>
</form>
        
       

        </>
    );
}

export default MyinfoModify;