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

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getGroundId() {
		return groundId;
	}

	public void setGroundId(int groundId) {
		this.groundId = groundId;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public Integer getMinParticipant() {
		return minParticipant;
	}

	public void setMinParticipant(Integer minParticipant) {
		this.minParticipant = minParticipant;
	}

	public Integer getMaxParticipant() {
		return maxParticipant;
	}

	public void setMaxParticipant(Integer maxParticipant) {
		this.maxParticipant = maxParticipant;
	}
	
	

}
