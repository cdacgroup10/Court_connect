package com.turfmanagement.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.turfmanagement.dao.EventParticipantDao;
import com.turfmanagement.dto.CommonApiResponse;
import com.turfmanagement.dto.EventAddRequest;
import com.turfmanagement.dto.EventDto;
import com.turfmanagement.dto.EventParticipantDto;
import com.turfmanagement.dto.EventResponse;
import com.turfmanagement.entity.Booking;
import com.turfmanagement.entity.Event;
import com.turfmanagement.entity.EventParticipant;
import com.turfmanagement.entity.Ground;
import com.turfmanagement.entity.User;
import com.turfmanagement.service.BookingService;
import com.turfmanagement.service.EventService;
import com.turfmanagement.service.GroundService;
import com.turfmanagement.service.UserService;
import com.turfmanagement.utility.Constants.BookingStatus;
import com.turfmanagement.utility.Constants.EventStatus;
import com.turfmanagement.utility.Constants.UserRole;
import com.turfmanagement.utility.Helper;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/event/")
//@CrossOrigin(origins = "http://localhost:3000")
public class EventController {

	Logger LOG = LoggerFactory.getLogger(EventController.class);

	@Autowired
	private EventService eventService;

	@Autowired
	private BookingService bookingService;

	@Autowired
	private UserService userService;

	@Autowired
	private GroundService groundService;

	@Autowired
	private EventParticipantDao eventParticipantDao;

	@Value("${com.turfmanagement.event.advance.amount}")
	private double advanceAmountToPay;

	@PostMapping("add")
	@ApiOperation(value = "Api to add event")
	public ResponseEntity<CommonApiResponse> addEvent(@RequestBody EventAddRequest eventAddRequest) {
		LOG.info("Recieved request for Add Event");

		CommonApiResponse response = new CommonApiResponse();

		if (eventAddRequest == null) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, request data is missing");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		Ground ground = this.groundService.getGroundById(eventAddRequest.getGroundId());

		if (ground == null) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, ground not found!!!");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		User customer = this.userService.getUserById(eventAddRequest.getCustomerId());

		if (customer == null) {
			response.setSuccess(true);
			response.setResponseMessage("bad request, customer  not found!!!");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		if (customer.getWalletAmount() < advanceAmountToPay) {
			response.setSuccess(true);
			response.setResponseMessage("Insufficient Funds in your wallet!!!");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		List<Booking> alreadyBooked = this.bookingService.getBookingByDateAndGroundIdAndTimeSlotAndStatus(
				eventAddRequest.getDate(), eventAddRequest.getGroundId(), eventAddRequest.getTimeSlot(),
				Arrays.asList(BookingStatus.APPROVED.value(), BookingStatus.APPROVED_ADVCANCE_PAID.value()));

		if (!alreadyBooked.isEmpty()) {
			response.setSuccess(true);
			response.setResponseMessage("Selected Slot is already booked, you may select different slot");
			return new ResponseEntity<CommonApiResponse>(response, HttpStatus.BAD_REQUEST);
		}

		customer.setWalletAmount(customer.getWalletAmount() - advanceAmountToPay);
		this.userService.updateUser(customer);

		User firstAdminAccount = this.userService.getAllUserByRole(UserRole.ADMIN.value()).get(0);
		firstAdminAccount.setWalletAmount(firstAdminAccount.getWalletAmount() + advanceAmountToPay);
		this.userService.updateUser(firstAdminAccount);

		Event event = new Event();
		event.setCustomer(customer);
		event.setGround(ground);
		event.setMinParticipant(eventAddRequest.getMinParticipant());
		event.setMaxParticipant(eventAddRequest.getMaxParticipant());
		event.setAdvanceAmountPaid(advanceAmountToPay);
		event.setDescription(eventAddRequest.getDescription());
		event.setDate(eventAddRequest.getDate());
		event.setName(eventAddRequest.getName());
		event.setTimeSlot(eventAddRequest.getTimeSlot());
		event.setStatus(EventStatus.APPROVED_AND_ADVANCE_PAID.value());
		event.setEventStartInMillis(
				String.valueOf(Helper.getDateTimeInMillis(eventAddRequest.getDate(), eventAddRequest.getTimeSlot())));

		Event addedEvent = this.eventService.addEvent(event);

		Booking booking = new Booking();
		booking.setBookingId(Helper.getAlphaNumericId());
		booking.setDate(eventAddRequest.getDate());
		booking.setEvent(addedEvent);
		booking.setGroundId(ground.getId());
		booking.setStatus(BookingStatus.APPROVED_ADVCANCE_PAID.value());
		booking.setTimeSlot(eventAddRequest.getTimeSlot());
		booking.setUserId(customer.getId());
		booking.setEvent(addedEvent);
		booking.setEventPaidAmount(advanceAmountToPay);

		this.bookingService.addBooking(booking);

		response.setSuccess(true);
		response.setResponseMessage("Event Created Successful!!!");
		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

	@GetMapping("/fetch")
	@ApiOperation(value = "Api to fetch events")
	public ResponseEntity<EventResponse> fetchUpcoimgEvent() {
		LOG.info("Recieved request to fetch events");

		EventResponse response = new EventResponse();

		List<Event> events = new ArrayList<>();

		String bookingTime = String
				.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

		events = this.eventService.getByStartTime(Arrays.asList(EventStatus.APPROVED_AND_ADVANCE_PAID.value()),
				bookingTime);

		response.setEvents(events);
		response.setSuccess(true);
		response.setResponseMessage("Event fetched successfully");
		return new ResponseEntity<EventResponse>(response, HttpStatus.OK);

	}

	@GetMapping("/fetch/customer-wise")
	@ApiOperation(value = "Api to fetch events")
	public ResponseEntity<EventResponse> fetchCustomerEvents(@RequestParam("customerId") Integer customerId) {
		LOG.info("Recieved request to fetch events");

		EventResponse response = new EventResponse();

		List<Event> events = new ArrayList<>();

		User customer = this.userService.getUserById(customerId);

		events = this.eventService.getEventByCustomerId(customer);

		response.setEvents(events);
		response.setSuccess(true);
		response.setResponseMessage("Event fetched successfully");
		return new ResponseEntity<EventResponse>(response, HttpStatus.OK);

	}

	@GetMapping("id")
	@ApiOperation(value = "Api to fetch event by using id")
	public ResponseEntity<EventResponse> fetchEvent(@RequestParam("eventId") int eventId) {
		LOG.info("Recieved request for fetching the event by id");

		EventResponse response = new EventResponse();

		Event event = this.eventService.getEventById(eventId);

		response.setEvents(Arrays.asList(event));
		response.setSuccess(true);
		response.setResponseMessage("Event fetched successfully");
		return new ResponseEntity<EventResponse>(response, HttpStatus.OK);

	}

	@PostMapping("customer/participate")
	@ApiOperation(value = "API to participate in event")
	public ResponseEntity<CommonApiResponse> addEventParticipant(@RequestBody EventAddRequest eventAddRequest) {
		LOG.info("Received request for participation in event");

		CommonApiResponse response = new CommonApiResponse();

		if (eventAddRequest == null) {
			response.setSuccess(false);
			response.setResponseMessage("Bad request, request data is missing");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		Event event = this.eventService.getEventById(eventAddRequest.getId());
		if (event == null) {
			response.setSuccess(false);
			response.setResponseMessage("Bad request, event not found!!!");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		if (event.getStatus().equals(EventStatus.APPROVED_AND_PAID.value())) {
			response.setSuccess(true);
			response.setResponseMessage("Event Host has booked the  turf!!!");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		if (event.getStatus().equals(EventStatus.CANCEL.value())) {
			response.setSuccess(true);
			response.setResponseMessage("Event Host, has cancelled this Event!!!");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		User customer = this.userService.getUserById(eventAddRequest.getCustomerId());
		if (customer == null) {
			response.setSuccess(true);
			response.setResponseMessage("Bad request, customer not found!!!");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		if (customer.getId() == event.getCustomer().getId()) {
			response.setSuccess(true);
			response.setResponseMessage("This event is hosted by you only!!!");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		if (customer.getWalletAmount() < advanceAmountToPay) {
			response.setSuccess(true);
			response.setResponseMessage("Insufficient funds in your wallet!!!");
			return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
		}

		List<EventParticipant> participants = event.getParticipants();
		if (CollectionUtils.isEmpty(participants)) {
			participants = new ArrayList<>();
		}

		if (participants.size() >= event.getMaxParticipant()) {
			response.setSuccess(true);
			response.setResponseMessage("Max participants reached!!!");
			return new ResponseEntity<>(response, HttpStatus.OK);
		}

		for (EventParticipant participant : participants) {

			if (participant.getUser().getId() == customer.getId()) {
				response.setSuccess(true);
				response.setResponseMessage("You have already participated in this Event!!!");
				return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
			}

		}

		String bookingTime = String
				.valueOf(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());

		EventParticipant participant = new EventParticipant();
		participant.setEvent(event);
		participant.setUser(customer);
		participant.setDateTime(bookingTime);

		EventParticipant addedParticipant = this.eventParticipantDao.save(participant);

		participants.add(addedParticipant);
		event.setParticipants(participants);
		this.eventService.addEvent(event);

		response.setSuccess(true);
		response.setResponseMessage("Event participation successful!!!");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/fetch/event-participants")
	@ApiOperation(value = "Api to participants events")
	public ResponseEntity<EventParticipantDto> fetchParticipantEvents(
			@RequestParam("participantId") Integer participantId) {
		LOG.info("Recieved request to fetch events");

		EventParticipantDto response = new EventParticipantDto();

		List<EventDto> eventDtos = new ArrayList<>();

		User customer = this.userService.getUserById(participantId);

		List<EventParticipant> eventParticipants = new ArrayList<>();

		eventParticipants = this.eventParticipantDao.findByUser(customer);

		for (EventParticipant participant : eventParticipants) {

			EventDto dto = Event.toEventDto(participant.getEvent());
			dto.setParticipationTime(participant.getDateTime());
			eventDtos.add(dto);
		}

		response.setParticipants(eventDtos);
		response.setSuccess(true);
		response.setResponseMessage("Event participant fetched successfully");
		return new ResponseEntity<EventParticipantDto>(response, HttpStatus.OK);

	}

	@GetMapping("/pay-and-confirm")
	@ApiOperation(value = "Api to pay and confirm the event booking")
	public ResponseEntity<CommonApiResponse> payAndConfirmBooking(@RequestParam("eventId") Integer eventId) {
		LOG.info("Recieved request for pay and confirm the event booking");

		CommonApiResponse response = new CommonApiResponse();

		Event event = this.eventService.getEventById(eventId);

		double advanceAmount = event.getAdvanceAmountPaid();

		double totalTurfAmountToPay = event.getGround().getPrice();

		double pendingAmountToPay = totalTurfAmountToPay - advanceAmount;

		List<EventParticipant> participants = event.getParticipants();

		int totalParticipants = participants.size();

		double perPersonPrice = pendingAmountToPay / totalParticipants;

		User firstAdminAccount = this.userService.getAllUserByRole(UserRole.ADMIN.value()).get(0);

		double participantsContributionPrice = 0;

		for (EventParticipant participant : participants) {

			User user = participant.getUser();

			user.setWalletAmount(user.getWalletAmount() - perPersonPrice);
			this.userService.updateUser(user);

			participantsContributionPrice = participantsContributionPrice + perPersonPrice;

		}

		firstAdminAccount.setWalletAmount(firstAdminAccount.getWalletAmount() + participantsContributionPrice);
		this.userService.updateUser(firstAdminAccount);

		event.setStatus(EventStatus.APPROVED_AND_PAID.value());
		this.eventService.addEvent(event);
		
		Booking booking = this.bookingService.getBookingByEvent(event);
		booking.setEventPaidAmount(participantsContributionPrice + advanceAmount);
		booking.setStatus(BookingStatus.APPROVED.value());
	    
		this.bookingService.addBooking(booking);

		response.setSuccess(true);
		response.setResponseMessage("Event Confirmed!!!");
		return new ResponseEntity<CommonApiResponse>(response, HttpStatus.OK);

	}

}
