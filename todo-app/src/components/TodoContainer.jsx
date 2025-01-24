import React, { useEffect, useState } from 'react'
import TodoFooter from './TodoFooter'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

function TodoContainer() {

  // state
  const [ todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')

  // 이벤트 함수
  // 체크박스 토글 함수
  const onToggle = async (todo) => {
   const newTodoList = todoList.map( (item) => {
      return item.id == todo.id ? {...item, status : !item.status} : item;
    })

    // 클라이언트에서 sort (정렬)
    newTodoList.sort( (a,b) =>{
      return a.status == b.status ? a.seq : ( a.status ? 1 : -1)
    })

    // 상태 수정 요청
    const data = {
      ...todo,
      status : !todo.status
    }
    
    const option = {
      method : 'PUT',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    try{
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      const msg = await response.text()
      // console.log("메세지");
      // console.log(msg);
    } catch(error){
      console.log("에러");
      console.log(error);
    }
    
    
    // state 업데이트
    setTodoList( newTodoList)
    getList()
  }

  const onRemove = async(id) =>{

    const option = {
      method:'DELETE',
      headers:{
        'Content-Type' : 'application/json'
      }

    }
      try{
        const url = `http://localhost:8080/todos/${id}`
        const response = await fetch(url, option)
        const msg = await response.text()
        console.log(msg);
      } catch(error){
        console.log(error);

      }
    getList()    
  }

  const getList = async() =>  {
    // 할일 목록 요청
    fetch('http://localhost:8080/todos')
      .then(response => response.json() )
      .then(data => {
        // console.log(data); 
        // data.list : 할일 목록
        // data.pagination : 페이지 정보
        setTodoList( data.list)
        // console.log(todoList)
      })
      .catch(error => {console.log(error); });
  }

  const onChange =(e) =>{
    console.log(e.target.value);
    setInput(e.target.value)
  }

  useEffect( () =>{
    // 할일 목록 요청
    fetch('http://localhost:8080/todos')
      .then(response => response.json() )
      .then(data => {
        // console.log(data); 
        // data.list : 할일 목록
        // data.pagination : 페이지 정보
        setTodoList( data.list)
        console.log(todoList)
      })
      .catch(error => {console.log(error); });
    

  }, [])

  const onSubmit= async(e) =>{
    e.preventDefault(); // 기본 이벤트 동작 방지
    
    
    // 데이터 등록 요청
    const data = {
      name:input == '' ? '할 일 없음' : input,
      seq:1,
    }
    const option ={
      method:'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }
    try{
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log("메세지");
      console.log(msg);
    } catch(error){
      
      console.log("에러");
      console.log(error);
    }
    getList() // 할 일 목록 다시조회
    setInput('') // 입력 값 비우기
  }

  // 전체 완료
  const onCompleteAll = async () => {
    // PUT 
    const data = {
      id:  null
    }
    const option = {
      method : 'PUT',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    try{
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log("메세지");
      console.log(msg);
    } catch(error){
      console.log("에러");
      console.log(error);
    }

    // 리스트 다시요청
    getList();
  }
  const onDeleteAll = async () => {
    // PUT 
    const data = {
      id:  null
    }
    const option = {
      method : 'DELETE',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    }

    try{
      const url = 'http://localhost:8080/todos'
      const response = await fetch(url, option)
      const msg = await response.text()
      console.log("메세지");
      console.log(msg);
    } catch(error){
      console.log("에러");
      console.log(error);
    }

    // 리스트 다시요청
    getList();
  }


  return (
    <div className='container'>
      <TodoHeader/>
      <TodoInput input={input} onChange={onChange} onSubmit={onSubmit}/>
      <TodoList todoList = { todoList } onToggle={onToggle} onRemove={onRemove}/>
      <TodoFooter onCompleteAll = {onCompleteAll} onDeleteAll = {onDeleteAll} />
    </div>
  )
}

export default TodoContainer