package com.aloha.todolist.service;

import com.aloha.todolist.domain.Todos;
import com.github.pagehelper.PageInfo;

public interface TodoService extends BaseService<Todos> {

    public PageInfo<Todos> list(int page, int size);

    // 전체 완료
    public boolean compleateAll() throws Exception;

    // 전체 완료
    public boolean deleteAll() throws Exception;

}
