package com.turfmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.turfmanagement.entity.Event;
import com.turfmanagement.entity.EventParticipant;
import com.turfmanagement.entity.User;

@Repository
public interface EventParticipantDao extends JpaRepository<EventParticipant, Integer> {

	List<EventParticipant> findByEvent(Event event);

	List<EventParticipant> findByUser(User customer);

}
