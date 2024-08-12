package com.turfmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class EventParticipantDto extends CommonApiResponse {

	private List<EventDto> participants = new ArrayList<>();

	public List<EventDto> getParticipants() {
		return participants;
	}

	public void setParticipants(List<EventDto> participants) {
		this.participants = participants;
	}
	
	
	
}
