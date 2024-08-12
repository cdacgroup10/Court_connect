package com.turfmanagement.utility;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class Helper {

	public static String getAlphaNumericId() {

		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";

		StringBuilder sb = new StringBuilder(10);

		for (int i = 0; i < 10; i++) {

			int index = (int) (AlphaNumericString.length() * Math.random());

			sb.append(AlphaNumericString.charAt(index));
		}

		return sb.toString().toUpperCase();
	}

	// Method to get milliseconds since epoch for a given date and time slot string
	public static long getDateTimeInMillis(String dateStr, String timeSlotStr) {
		try {
			// Parse the date
			LocalDate date = LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

			// Extract the start time from the time slot string
			LocalTime startTime = extractStartTimeFromSlot(timeSlotStr);

			// Combine date and start time to get LocalDateTime
			LocalDateTime dateTime = LocalDateTime.of(date, startTime);

			// Convert LocalDateTime to milliseconds since epoch
			return dateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();

		} catch (DateTimeParseException e) {
			System.err.println("Error parsing date or time slot: " + e.getMessage());
			return -1; // Indicate an error
		}
	}

	// Helper method to extract start time from a time slot string
	private static LocalTime extractStartTimeFromSlot(String timeSlotStr) {
		// Time slot string format should be "09:00 - 10:00 pm" or similar
		String[] parts = timeSlotStr.split(" - ");
		if (parts.length < 2) {
			throw new IllegalArgumentException("Invalid time slot format.");
		}

		// Extract the start time part
		String startTimeStr = parts[0].trim(); // "09:00"
		String amPmPart = parts[1].split(" ")[1].trim(); // "pm"

		// Combine start time with AM/PM part
		String fullStartTimeStr = startTimeStr + " " + amPmPart; // "09:00 pm"

		// Define the formatter to handle AM/PM
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm a");

		// Parse the start time string
		return LocalTime.parse(fullStartTimeStr, formatter);
	}

}
