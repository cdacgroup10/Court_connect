package com.turfmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.turfmanagement.entity.Event;
import com.turfmanagement.entity.User;

@Repository
public interface EventDao extends JpaRepository<Event, Integer> {

	List<Event> findByCustomer(User customer);

	List<Event> findByStatusInAndEventStartInMillisGreaterThan(List<String> status, String startTime);

}
