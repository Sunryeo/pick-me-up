import React, { useState } from 'react';
import styles from './Writing.module.css';
import { Link } from 'react-router-dom';

const Writing = ({feed, resetRevised}) => {

  const tags=['#의류', '#리빙', '#뷰티', '#식품', '#잡화', '#디지털']

  const [isClicked, setClicked] = useState([]); //카테고리
  const [title, setTitle] = useState(''); //제목
  const [fileUrl, setFileUrl] = useState(null); //이미지파일
  //옵션명1, 이미지url1, 옵션명2, 이미지url2, 내용 --> 상태추가 필요.

  const tagHandle = (tag) => {
    if(isClicked.includes(tag)){
      setClicked(isClicked.filter(el=> !(el===tag)))
    } else{
        setClicked(isClicked.concat(tag))
      }
    }

  const createFeedHandle = () => {
    // 피드테이블에 레코드 생성하는 axios POST 요청(지영)
    // 해당 피드 페이지로 Redirect 필요
  }

  const reviseFeedHandler = () => {
    // 피드테이블에 레코드 수정하는 axios POST 요청(지영)
    // 수정 후 해당 /feed 페이지로 Redirect 필요
  }

  const titleHandle = (event) => {
    setTitle(event.target.value);
  }

  const fileHandle = (event) => { //input file에서 url만 긁어오는 핸들러
   const imageFile = event.target.files[0];
    if(imageFile){
      const imageUrl = URL.createObjectURL(imageFile);
      setFileUrl(imageUrl)
    } else{
      setFileUrl(null);
    }
  }
 
  if(feed === null){ // 피드 생성
    
    return (
      <form action="" className={styles.container}>
        <div className={styles.category}>
          <div>제목</div>
          <input className={styles.textBoxTitle} type="text" value={title} onChange={titleHandle}/>
        </div>
        
        <div className={styles.category}>    
          <div>투표 옵션 1</div>
          <input className={styles.textBoxOpt} type="text" placeholder="항목명"/>
          <div className={styles.filebox}>
            <input type="file" id="ex_file" accept="image/*" onChange={fileHandle}></input>
            {fileUrl? <img className={styles.fileView} src={fileUrl}></img> : null}
          </div>
        </div>
    
    
        <div className={styles.category}>    
          <div>투표 옵션 2</div>
          <input className={styles.textBoxOpt} type="text" placeholder="항목명"/>
          <div className={styles.filebox}>
            <input type="file" id="ex_file"></input> 
          </div>
        </div>
    
        <div className={styles.category}>
          <div>내용</div>
          <textarea name="content" id="" cols="30" rows="10"></textarea>
        </div>
    
        <div className={styles.category}>
          <div>카테고리<span class={styles.subTitle}>(복수선택가능)</span></div>
          <div className={styles.tags}>
            {tags.map(el =>{ 
              return <>
                <input type="checkbox" name={el} value={el}/>
                <label className={isClicked.includes(el)? styles.hashtagClicked :styles.hashtag} onClick={()=>tagHandle(el)}>{el}</label>
              </>
            })}
          </div>
        </div>
    
        <div className={styles.submit}>
          <button className={styles.submitBtn} onClick={createFeedHandle}>등록</button>
          <Link to="/">
            <button className={styles.submitBtn}>취소</button>
          </Link>
          
        </div>
    
      </form>
      )
  } else{ // 내 피드 수정하기
  return (
  <form action="" className={styles.container}>
    <div className={styles.category}>
      <div>제목</div>
      <input className={styles.textBoxTitle} defaultValue={feed.title} type="text"/>
    </div>
    
    <div className={styles.category}>    
      <div>투표 옵션 1</div>
      <input className={styles.textBoxOpt} defaultValue={feed.option_1} type="text"/>
      <div className={styles.filebox}>
        <input type="file" id="ex_file" ></input> 
      </div>
      
    </div>


    <div className={styles.category}>    
      <div>투표 옵션 2</div>
      <input className={styles.textBoxOpt} defaultValue={feed.option_2}type="text"/>
      <div className={styles.filebox}>
        <input type="file" id="ex_file" ></input> 
      </div>
    </div>

    <div className={styles.category}>
      <div>내용</div>
      <textarea name="content" id="" cols="30" rows="10" defaultValue={feed.content}></textarea>
    </div>

    <div className={styles.category}>
      <div>카테고리<span class={styles.subTitle}>(복수선택가능)</span></div>
      <div className={styles.tags}>
      {tags.map(el =>{ 
              return <>
                <input type="checkbox" name={el} value={el}/>
                <label className={isClicked.includes(el)? styles.hashtagClicked :styles.hashtag} onClick={()=>tagHandle(el)}>{el}</label>
              </>
      })}
      </div>
    </div>

    <div className={styles.submit}>
      <button className={styles.submitBtn} onClick={reviseFeedHandler}>등록</button>
      <Link to="/mypage">
        {/* 취소버튼을 누르면 revised할 컨텐츠가 저장되지 않고 다시 null로 */}
        <button className={styles.submitBtn} onClick={resetRevised}>취소</button>
      </Link>
      
    </div>

  </form>
  )}
};

export default Writing;