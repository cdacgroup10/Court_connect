package com.turfmanagement.dto;

import com.turfmanagement.entity.Ground;
import com.turfmanagement.entity.User;

import lombok.Data;

@Data
public class EventDto {

	private int id;

	private String name;

	private String description;

	private double advanceAmountPaid;

	private Ground ground;

	private User customer;

	private Integer minParticipant;

	private Integer maxParticipant;

	private String date;

	private String eventStartInMillis; // for easy

	private String timeSlot;

	private String status;

	private String participationTime;

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

	public double getAdvanceAmountPaid() {
		return advanceAmountPaid;
	}

	public void setAdvanceAmountPaid(double advanceAmountPaid) {
		this.advanceAmountPaid = advanceAmountPaid;
	}

	public Ground getGround() {
		return ground;
	}

	public void setGround(Ground ground) {
		this.ground = ground;
	}

	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getEventStartInMillis() {
		return eventStartInMillis;
	}

	public void setEventStartInMillis(String eventStartInMillis) {
		this.eventStartInMillis = eventStartInMillis;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getParticipationTime() {
		return participationTime;
	}

	public void setParticipationTime(String participationTime) {
		this.participationTime = participationTime;
	}
	
	

}
