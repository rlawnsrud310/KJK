package com.aloha.todolist.domain;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todos {
    private Long no; // PK
    private String id; // UK
    private String name; // 할일
    private Boolean status; // 상태
    private Integer seq; // 순번
    private Date createdAt; // 등록날짜
    private Date updatedAt; // 수정날짜

}