package com.turfmanagement.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Ground {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String description;

	private double width;

	private double height;

	private double length;

	private String image;

	private double price;

	private int status;

	@ManyToOne
	@JoinColumn(name = "location_id")
	private Location location;

}
