package com.turfmanagement.dto;

import java.util.ArrayList;
import java.util.List;

import com.turfmanagement.entity.Location;

public class LocationFetchResponse extends CommonApiResponse {

	private List<Location> locations = new ArrayList<>();

	public List<Location> getLocations() {
		return locations;
	}

	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}

}
