package com.aloha.todolist.Controller;

import org.springframework.stereotype.Controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@Controller
public class HomeController {

    @GetMapping({ "/", "" })
    public String gome(@RequestParam String param) {
        return "redirect:/swagger-ui/index.html";
    }

}
