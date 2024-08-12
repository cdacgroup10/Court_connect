package com.turfmanagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.turfmanagement.dao.GroundDao;
import com.turfmanagement.entity.Ground;
import com.turfmanagement.entity.Location;

@Service
public class GroundService {
	
	@Autowired
	private GroundDao groundDao;
	
	public Ground addGround(Ground ground) {
		return groundDao.save(ground);
	}
	 
	public Ground getGroundById(int groundId) {
		return groundDao.findById(groundId).get();
	}
	
	public List<Ground> getAllGroundByStatus(int status) {
		return this.groundDao.findByStatus(status);
	}
	
	public List<Ground> getGroundByLocation(Location location, int status) {
		return this.groundDao.findByLocationAndStatus(location, status);
	}
	
	public void deleteGround(Ground ground) {
		this.groundDao.delete(ground);
	}
}
