package com.turfmanagement.dto;

import lombok.Data;

@Data
public class UserLoginResponseDto extends CommonApiResponse {
	
	private UserLoginResponse user;

	public UserLoginResponse getUser() {
		return user;
	}

	public void setUser(UserLoginResponse user) {
		this.user = user;
	}
	

}
