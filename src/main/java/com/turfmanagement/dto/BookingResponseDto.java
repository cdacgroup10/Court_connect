package com.turfmanagement.dto;

import com.turfmanagement.entity.Event;

import lombok.Data;

@Data
public class BookingResponseDto {
	
    private int id;
	
	private String bookingId;
	
	private String timeSlot;
	
	private String date;
	
	private int userId;
	
	private int groundId;
	
	private String status;
	
	private String customerName;
	
	private String customerContact;
	
	private String groundName;
	
	private String groundImage;
	
	private String price;
	
	private Event event;
	
	private double eventPaidAmount;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBookingId() {
		return bookingId;
	}

	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public int getGroundId() {
		return groundId;
	}

	public void setGroundId(int groundId) {
		this.groundId = groundId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerContact() {
		return customerContact;
	}

	public void setCustomerContact(String customerContact) {
		this.customerContact = customerContact;
	}

	public String getGroundName() {
		return groundName;
	}

	public void setGroundName(String groundName) {
		this.groundName = groundName;
	}

	public String getGroundImage() {
		return groundImage;
	}

	public void setGroundImage(String groundImage) {
		this.groundImage = groundImage;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public double getEventPaidAmount() {
		return eventPaidAmount;
	}

	public void setEventPaidAmount(double eventPaidAmount) {
		this.eventPaidAmount = eventPaidAmount;
	}
	
	
	
}
