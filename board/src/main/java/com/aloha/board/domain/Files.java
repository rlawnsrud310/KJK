package com.aloha.board.domain;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class Files {

    private Long no; // PK
    private String id; // UK
    private String pTable; // 부모테이블
    private Long pNo; // 부모 PK
    private String type; // 파일 종류
    private String fileName; // 파일명
    private String originName;// 원본 파일명
    private String filePath; // 파일경로
    private Long fileSize; // 용량
    private Long seq; // 순서
    private Date createdAt; // 등록일자
    private Date updatedAt; // 수정일자

    // 파일 데이터
    MultipartFile data;

    // 파일
    // private List<MultipartFile> fileList;

    public Files() {
        this.id = UUID.randomUUID().toString();
    }
}