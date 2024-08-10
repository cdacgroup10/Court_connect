package com.turfmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class EventParticipantDto extends CommonApiResponse {

	private List<EventDto> participants = new ArrayList<>();
	
}
