package com.turfmanagement.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.turfmanagement.interceptor.RequestHeaderInterceptor;


// for interceptor
@Configuration
public class ApplicationConfig implements WebMvcConfigurer {
	
	@Autowired
	private RequestHeaderInterceptor requestHeaderInterceptor;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(requestHeaderInterceptor);
	}

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://courtconnectfrontend-git-main-himanshus-projects-5f28ccc1.vercel.app") // Update with your Netlify domain
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
