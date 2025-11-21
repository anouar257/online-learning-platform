package com.example.platform.inscription.feign;

import com.example.platform.inscription.model.Cours;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cours-service", url = "http://localhost:8081")
public interface CoursRestClient {

    @GetMapping("/cours/{id}")
    Cours getCoursById(@PathVariable("id") Long id);
}
