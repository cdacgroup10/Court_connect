package com.turfmanagement.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.turfmanagement.entity.Location;

@Repository
public interface LocationDao extends JpaRepository<Location, Integer> {

}
