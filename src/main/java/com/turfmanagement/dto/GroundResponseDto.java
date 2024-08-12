package com.turfmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.turfmanagement.entity.Ground;

import lombok.Data;

@Data
public class GroundResponseDto extends CommonApiResponse {
	
	private List<Ground> grounds = new ArrayList<>();

	public List<Ground> getGrounds() {
		return grounds;
	}

	public void setGrounds(List<Ground> grounds) {
		this.grounds = grounds;
	}
	

}
