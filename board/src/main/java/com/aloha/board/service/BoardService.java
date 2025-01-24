package com.aloha.board.service;

import org.springframework.stereotype.Service;

import com.aloha.board.domain.Boards;
import com.github.pagehelper.PageInfo;

@Service
public interface BoardService extends BaseService<Boards> {

    // 페이징
    public PageInfo<Boards> list(int page, int size);

}
