package com.turfmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.turfmanagement.dao.EventDao;
import com.turfmanagement.entity.Event;
import com.turfmanagement.entity.User;

@Service
public class EventService {

	@Autowired
	private EventDao eventDao;

	public Event addEvent(Event event) {
		return this.eventDao.save(event);
	}

	public Event getEventById(int eventId) {
		return this.eventDao.findById(eventId).get();
	}

	public List<Event> getAllEvent() {
		return this.eventDao.findAll();
	}

	public List<Event> getEventByCustomerId(User customer) {
		return this.eventDao.findByCustomer(customer);
	}

	public List<Event> getByStartTime(List<String> status,String startTime) {
		return this.eventDao.findByStatusInAndEventStartInMillisGreaterThan(status, startTime);
	}

}
