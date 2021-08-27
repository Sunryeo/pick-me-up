import React from 'react';
import styles from './Writing.module.css';

const Writing = (props) => {

  return (
  <section className={styles.container}>
    <div className={styles.category}>
      <div>제목</div>
      <input className={styles.textBox} type="text"/>
    </div>
    
    <div className={styles.category}>    
      <div>투표 옵션 1</div>
      <input className={styles.textBox} type="text" />
      <div class={styles.filebox}>
        <label for="ex_file">이미지 업로드</label> 
        <input type="file" id="ex_file"></input> 
      </div>
      
    </div>


    <div className={styles.category}>    
      <div>투표 옵션 2</div>
      <input className={styles.textBox} type="text"/>
      <div class={styles.filebox}>
        <label for="ex_file">이미지 업로드</label> 
        <input type="file" id="ex_file"></input> 
      </div>
    </div>

    <div className={styles.category}>
      <div>내용</div>
      <textarea name="content" id="" cols="30" rows="10"></textarea>
    </div>

    <div className={styles.category}>
      <div>카테고리 <span class={styles.subTitle}>(복수선택가능)</span></div>
      <div className={styles.tags}>
        <label className={styles.hashtag}><input type="checkbox" name="tag1" value="1"/>#의류</label>
        <label className={styles.hashtag}><input type="checkbox" name="tag2" value="2"/>#리빙</label>
        <label className={styles.hashtag}><input type="checkbox" name="tag3" value="3"/>#디지털</label>
        <label className={styles.hashtag}><input type="checkbox" name="tag4" value="4"/>#식품</label>
        <label className={styles.hashtag}><input type="checkbox" name="tag5" value="5"/>#잡화</label>
        <label className={styles.hashtag}><input type="checkbox" name="tag6" value="6"/>#기타</label>
      </div>
    </div>

    <div className={styles.submit}>
      <button className={styles.submitBtn}>등록</button>
      <button className={styles.submitBtn}>취소</button>
    </div>

  </section>
  )
};

export default Writing;