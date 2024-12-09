package com.turfmanagement.dto;

import java.util.List;

import lombok.Data;

@Data
public class BookingResponse extends CommonApiResponse {
	
	private List<BookingResponseDto> bookings;

	public List<BookingResponseDto> getBookings() {
		return bookings;
	}

	public void setBookings(List<BookingResponseDto> bookings) {
		this.bookings = bookings;
	}

}
