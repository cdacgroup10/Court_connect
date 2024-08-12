package com.turfmanagement.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.turfmanagement.entity.Booking;
import com.turfmanagement.entity.Event;

@Repository
public interface BookingDao extends JpaRepository<Booking, Integer> {
	
	List<Booking> findByUserId(int userId);

	List<Booking> findByDateAndGroundIdAndTimeSlotAndStatusIn(String date,int groundId, String timeSlot, List<String> status);
	
	List<Booking> findByGroundId(int groundId);
	
	Booking findByEvent(Event event);
	
}
