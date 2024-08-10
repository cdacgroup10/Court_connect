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

}
