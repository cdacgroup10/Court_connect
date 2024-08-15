package com.turfmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.turfmanagement.entity.Event;
import com.turfmanagement.entity.EventParticipant;

import lombok.Data;

@Data
public class EventResponse extends CommonApiResponse {
	
	private List<Event> events = new ArrayList<>(); 
	
	private List<EventParticipant> eventParticipants = new ArrayList<>();

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}

	public List<EventParticipant> getEventParticipants() {
		return eventParticipants;
	}

	public void setEventParticipants(List<EventParticipant> eventParticipants) {
		this.eventParticipants = eventParticipants;
	} 

}
