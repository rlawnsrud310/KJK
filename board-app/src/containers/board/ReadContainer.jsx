import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as boards from '../../apis/boards'
import * as files from '../../apis/file'
import BoardRead from '../../components/board/BoardRead'

const ReadContainer = () => {

  const { id } = useParams()

  // state
  const [board, setBoard] = useState({})
  const [fileList, setFileList] = useState([])
  const [mainFile, setMainFile] = useState()

  // 게시글 데이터 요청
  const getBoard = async () => {
    const response = await boards.select(id)
    const data = await response.data
    setBoard(data.board)
    setFileList(data.fileList)

    const no = await data.board.no
    getMainFile(no) // 메인파일
  }

  // 메인 파일 조회
  const getMainFile = async (no) => {
    const response = await files.fileByType("boards", no, "MAIN")
    const file = await response.data
    setMainFile(file)
  }

  // 다운로드
  const onDownload = async (id, fileNmae) => {
    // API 요청
    const response = await FileSystem.download(id)
    console.log(response);

    // 1. 서버에서 응답 파일데이터를 받은 Bolb 변환
    // 2. 브라우저를 통해 a 태그로 등록
    // 3. a태그의 다운로드 기능으로 요청
    const url = window.URL.createObjectURL(new Blob( [response.data]))
    // <a href="data" download = "파일명.png"</a>
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileNmae)
    document.body.appendChild(link)
    link.click()    // 다운로드 기능을 가진 a 태그 클릭
    document.body.removeChild(link)
  }


  useEffect( () => {
    // 게시글 정보 (게시글 + 파일목록)
    getBoard()
  }, [])
  return (
    <>
    {/* <div>ReadContainer</div> */}
    <BoardRead board={board} mainFile={mainFile} fileList ={fileList} onDownload={onDownload} />
    </>
  )
}

export default ReadContainer