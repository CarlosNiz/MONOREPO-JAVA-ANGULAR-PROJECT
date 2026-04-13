package com.carlosniz.gestao_ti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class GestaoTiApplication {

	public static void main(String[] args) {
		SpringApplication.run(GestaoTiApplication.class, args);
	}

}
