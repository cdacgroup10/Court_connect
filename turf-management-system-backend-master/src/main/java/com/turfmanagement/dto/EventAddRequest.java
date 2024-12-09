package com.turfmanagement.dto;

import lombok.Data;

@Data
public class EventAddRequest {

	private int id; // for adding participant 

	private String name;

	private String description;

	private int groundId;
	
	private String date;

	private String timeSlot;

	private int customerId;

	private Integer minParticipant;

	private Integer maxParticipant;

}
