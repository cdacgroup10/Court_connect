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

	public static EventDto toEventDto(Event event) {
		EventDto dto = new EventDto();
		BeanUtils.copyProperties(event, dto, "participants");
		return dto;
	}

}
