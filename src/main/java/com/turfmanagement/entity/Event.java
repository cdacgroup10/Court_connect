package com.turfmanagement.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.beans.BeanUtils;

import com.turfmanagement.dto.EventDto;

import lombok.Data;

@Data
@Entity
public class Event {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String description;

	private double advanceAmountPaid;

	@ManyToOne
	@JoinColumn(name = "ground_id")
	private Ground ground;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private User customer;

	private Integer minParticipant;

	private Integer maxParticipant;

	private String date;

	private String eventStartInMillis; // for easy

	private String timeSlot;

	private String status;

	@OneToMany(mappedBy = "event", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	private List<EventParticipant> participants = new ArrayList<>();
	
	

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



	public List<EventParticipant> getParticipants() {
		return participants;
	}



	public void setParticipants(List<EventParticipant> participants) {
		this.participants = participants;
	}



	public static EventDto toEventDto(Event event) {
		EventDto dto = new EventDto();
		BeanUtils.copyProperties(event, dto, "participants");
		return dto;
	}

}
