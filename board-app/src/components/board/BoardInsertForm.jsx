import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './css/BoardInsertForm.css'
import styles from './css/BoardInsertForm.module.css'
// import styles from './css/BoardInsertForm.module.css'

const BoardInsertForm = ( { onInsert }) => {

  // state 선언
  const [title,setTitle] = useState('')
  const [writer,setWriter] = useState('')
  const [content,setContent] = useState('')
  const [mainFile, setMainFile] = useState(null)
  const [files, setFiles] = useState(null) // files state 추가

  const changeTitle = (e) => { setTitle( e.target.value )}
  const changeWriter = (e) => { setWriter( e.target.value )}
  const changeContent = (e) => { setContent( e.target.value )}


  const changeMainFile = (e) => {
    // files : []
    setMainFile(e.target.files[0])
  }

  // 파일 변경 이벤트 핸들러 추가
  const changeFile = (e) =>{ 
    setFiles(e.target.files)
  }

  const onSubmit = () =>{
    // Content-Type : application/json
    
    const formData = new FormData()
    // 게시글 정보 세팅
    formData.append('title', title)
    formData.append('writer', writer)
    formData.append('content', content)
    
    // 파일 데이터 세팅
    if(mainFile) {
      formData.append('mainFile',mainFile)
    }
    if( files ) {
      for (let i = 0; i < files.lenght; i++){
        const file = files[i];
        formData.append('files', files)
      }
    }
    
    // 헤더
    const headers = {
      'Content-Type' : 'multupart/form-data'
    }
    
    // 파일 업로드
    // application/json -> multupart/form-data
    // onInsert(title, writer, content)
    onInsert(formData, headers)
  }
  return (
    <div className="container">
      <h1 className="title">게시글 쓰기</h1>
      <table className={styles.table}>
      <tr>
        <th>제목</th>
        <td>
          {/* <input type="text" onChange={changeTitle} className='form-input' /> */}
          {/* 
                CSS modules 의 클래스 선택자는 카멜케이스로 쓰는 것이 관례
                                  CSS            Javasciprt
                * 카멜케이스 : .formInput   ➡  { styles.formInput }
                * 케밥케이스 : .form-input  ➡  { style['form-input'] } 
            */}
          <input type="text" onChange={changeTitle} className={styles['form-input']} />
        </td>
      </tr>

      <tr>
        <th>작성자</th>
        <td><input type="text" onChange={changeWriter} className={styles['form-input']}/></td>
      </tr>

      <tr>
        {/* <th>내용</th> */}
        <td colSpan={2}>
          <textarea cols={40} rows={10} onChange={changeContent} className={styles['form-input']}></textarea>
        </td>
      </tr>

      <tr>
        <th>대표 파일</th>
        <td>
          <input type="file" multiple onChange={changeMainFile} />
        </td>
      </tr>
      <tr>
        <th>첨부 파일</th>
        <td>
          <input type="file" multiple onChange={changeFile} />
        </td>
      </tr>
      </table>
      <div className="btn-box">
        <Link to="/boards" className="btn">목록</Link>
        <button className='btn' onClick={ onSubmit }>등록</button>
      </div>
    </div>
  )
}

export default BoardInsertForm