import { createTheme } from "@material-ui/core/styles";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { DateTimePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";

import styles from "./Main.module.css";

const url = "http://localhost:4567/";

function Main() {
	const [downloadUrl, setDownloadUrl] = useState("");
	const [cityName, setCityName] = useState("");
	const [attendeeURI, setAttendeeURI] = useState("");
	const [eventURI, setEventURI] = useState("");
	const [eventDate, setEventDate] = useState(Date());
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");
	const [responseDisplay, setResponseDisplay] = useState("");
	const [eventSameAsURI, setEventSameAsURI] = useState("");
	const [eventStartDate, setEventStartDate] = useState("");
	const [eventEndDate, setEventEndDate] = useState("");
	const [eventStartDateDisplay, setEventStartDateDisplay] = useState("");
	const [eventEndDateDisplay, setEventEndDateDisplay] = useState("");

	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const date = new Date();
		if (date.getFullYear() && date.getMonth() && date.getDate()) {
			let tempMonth = date.getMonth();
			const tempYear = date.getFullYear().toString();
			tempMonth = (tempMonth + 1).toString();
			const tempDay = date.getDate().toString().length > 1 ? date.getDate().toString() : `0${date.getDate()}`;
			setYear(tempYear);
			setMonth(tempMonth.length > 1 ? tempMonth : `0${tempMonth}`);
			setDay(tempDay);
		}
		setEventStartDate(date);
		setEventEndDate(date);
		setEventStartDateDisplay(date);
		setEventEndDateDisplay(date);
	}, []);

	const theme = createTheme({
		palette: {
			type: "dark",
		},
	});
	const handleEventSameAsURI = (e) => {
		setEventSameAsURI(e.target.value);
	};
	const handleEventStartDate = (e) => {
		let tempMonth = e.$M;
		const tempYear = e.$y.toString();
		tempMonth = (tempMonth + 1).toString();
		const tempDay = e.$D.toString().length > 1 ? e.$D.toString() : `0${e.$D}`;
		const tempHour = e.$H.toString().length > 1 ? e.$H.toString() : `0${e.$H}`;
		const tempMinutes = e.$m.toString().length > 1 ? e.$m.toString() : `0${e.$m}`;
		const finalTime = `${tempYear}-${tempMonth}-${tempDay}T${tempHour}:${tempMinutes}:00Z`;
		setEventStartDate(finalTime);
		setEventStartDateDisplay(e);
	};
	const handleEventEndDate = (e) => {
		let tempMonth = e.$M;
		const tempYear = e.$y.toString();
		tempMonth = (tempMonth + 1).toString();
		const tempDay = e.$D.toString().length > 1 ? e.$D.toString() : `0${e.$D}`;
		const tempHour = e.$H.toString().length > 1 ? e.$H.toString() : `0${e.$H}`;
		const tempMinutes = e.$m.toString().length > 1 ? e.$m.toString() : `0${e.$m}`;
		const finalTime = `${tempYear}-${tempMonth}-${tempDay}T${tempHour}:${tempMinutes}:00Z`;
		setEventEndDate(finalTime);
		setEventEndDateDisplay(e);
	};
	const handleDownloadUrl = (e) => {
		setDownloadUrl(e.target.value);
	};
	const handleCityName = (e) => {
		setCityName(e.target.value);
	};
	const handleAttendeeURI = (e) => {
		setAttendeeURI(e.target.value);
	};
	const handleEventURI = (e) => {
		setEventURI(e.target.value);
	};
	const handleEventDate = (e) => {
		setYear(e.$y.toString());
		let tempMonth = e.$M;
		tempMonth = (tempMonth + 1).toString();
		setMonth(tempMonth.length > 1 ? tempMonth : `0${tempMonth}`);
		setDay(e.$D.toString().length > 1 ? e.$D.toString() : `0${e.$D}`);
		setEventDate(e);
	};
	const handleExecuteDownload = () => {
		setResponseDisplay("");
		enqueueSnackbar("Download started", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}download`, downloadUrl)
			.then(() => {
				enqueueSnackbar("Download completed", {
					variant: "success",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar("Validation failed", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	const handleExecuteRead = () => {
		setResponseDisplay("");
		enqueueSnackbar("Reading started", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.get(`${url}read`)
			.then(() => {
				enqueueSnackbar("Reading completed", {
					variant: "success",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar("Validation failed", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	const handleExecuteScrape = () => {
		setResponseDisplay("");
		enqueueSnackbar("Scraping started", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}extract`, cityName)
			.then(() => {
				enqueueSnackbar("Scraping completed", {
					variant: "success",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar("Validation failed", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	const handleExecuteAddAttendee = () => {
		setResponseDisplay("");
		enqueueSnackbar("User addition started", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}add-attendee`, { eventURI, attendeeURI })
			.then(() => {
				enqueueSnackbar("user was successfully added to event", {
					variant: "success",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar("Error occured while adding user", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	const handleExecuteSameAs = () => {
		setResponseDisplay("");
		enqueueSnackbar("Started searching for same events", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}discover-and-link-same-events`, {
				startDate: eventStartDate,
				endDate: eventEndDate,
				location: eventSameAsURI,
			})
			.then((res) => {
				if (res.data !== "No events found") {
					const data = res.data.replace("[", "").replace("]", "").split(", ");
					setResponseDisplay(data);
					enqueueSnackbar("Same events linked and retrieved", {
						variant: "success",
						anchorOrigin: { horizontal: "right", vertical: "top" },
					});
				} else {
					enqueueSnackbar("No same events found", {
						variant: "error",
						anchorOrigin: { horizontal: "right", vertical: "top" },
					});
				}
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar("Error occured while retrieving events", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	const handleExecuteGetCourses = () => {
		setResponseDisplay("");
		enqueueSnackbar("Executing SPARQL query", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}get-events`, { year, month, day })
			.then((res) => {
				const data = res.data.replace("[", "").replace("]", "").split(", ");
				setResponseDisplay(data);
				if (Array.isArray(data) && data.length > 0) {
					enqueueSnackbar("Fetch completed", {
						variant: "success",
						anchorOrigin: { horizontal: "right", vertical: "top" },
					});
				} else {
					enqueueSnackbar("No information found", {
						variant: "error",
						anchorOrigin: { horizontal: "right", vertical: "top" },
					});
				}
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar("Error occured while fetching events", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	const handleExecuteGetEvents = () => {
		setResponseDisplay("");
		enqueueSnackbar("Executing SPQARL query events", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.get(`${url}get-non-course-events`)
			.then((res) => {
				const data = res.data.replace("[", "").replace("]", "").split(", ");
				setResponseDisplay(data);
				if (Array.isArray(data) && data.length > 0) {
					enqueueSnackbar("Fetch completed", {
						variant: "success",
						anchorOrigin: { horizontal: "right", vertical: "top" },
					});
				} else {
					enqueueSnackbar("No information were found", {
						variant: "error",
						anchorOrigin: { horizontal: "right", vertical: "top" },
					});
				}
			})
			.catch((err) => {
				console.error(err);
				enqueueSnackbar("Error occured while fetching events", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	return (
		<div className={styles.body}>
			<div className={styles.blockElementsContainer}>
				<div className={`${styles.elementContainer} ${styles.elementContainer__send}`}>
					<div className={styles.elementContainer__title}>Download, create & upload resource(s)</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="CPS2 ICS file URL"
									value={downloadUrl}
									variant="outlined"
									onChange={handleDownloadUrl}
								/>
							</div>
							<div className={styles.inputContainer}>
								<Button fullWidth variant="contained" onClick={handleExecuteDownload}>
									Execute
								</Button>
							</div>
						</div>
					</ThemeProvider>
				</div>
				<div className={`${styles.elementContainer} ${styles.elementContainer__send}`}>
					<div className={styles.elementContainer__title}>
						Read existing ICS file, re-create & re-upload resource(s)
					</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<Button fullWidth variant="contained" onClick={handleExecuteRead}>
									Execute
								</Button>
							</div>
						</div>
					</ThemeProvider>
				</div>
				<div className={`${styles.elementContainer} ${styles.elementContainer__send}`}>
					<div className={styles.elementContainer__title}>
						Extract city events from alentoor, create & upload resource(s)
					</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="City name"
									value={cityName}
									variant="outlined"
									onChange={handleCityName}
								/>
							</div>
							<div className={styles.inputContainer}>
								<Button fullWidth variant="contained" onClick={handleExecuteScrape}>
									Execute
								</Button>
							</div>
						</div>
					</ThemeProvider>
				</div>
				<div className={`${styles.elementContainer} ${styles.elementContainer__send}`}>
					<div className={styles.elementContainer__title}>Add attendee to event</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="URI of attendee resource"
									value={attendeeURI}
									variant="outlined"
									onChange={handleAttendeeURI}
								/>
							</div>
							<div className={styles.inputContainer}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="URI of event resource"
									value={eventURI}
									variant="outlined"
									onChange={handleEventURI}
								/>
							</div>
							<div className={styles.inputContainer}>
								<Button fullWidth variant="contained" onClick={handleExecuteAddAttendee}>
									Execute
								</Button>
							</div>
						</div>
					</ThemeProvider>
				</div>
			</div>
			<div className={styles.blockElementsContainer}>
				<div className={`${styles.elementContainer} ${styles.elementContainer__receive}`}>
					<div className={styles.elementContainer__title}>Find events by date</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<DesktopDatePicker
									inputFormat="DD/MM/YYYY"
									label="Date"
									renderInput={(params) => <TextField fullWidth {...params} />}
									value={eventDate}
									onChange={handleEventDate}
								/>
							</div>
							<div className={styles.inputContainer}>
								<Button fullWidth variant="contained" onClick={handleExecuteGetCourses}>
									Execute
								</Button>
							</div>
						</div>
					</ThemeProvider>
				</div>
				<div className={`${styles.elementContainer} ${styles.elementContainer__receive}`}>
					<div className={styles.elementContainer__title}>Find non course events</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<Button fullWidth variant="contained" onClick={handleExecuteGetEvents}>
									Execute
								</Button>
							</div>
						</div>
					</ThemeProvider>
				</div>
				<div className={`${styles.elementContainer} ${styles.elementContainer__receive}`}>
					<div className={styles.elementContainer__title}>Discover and link same events</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles["elementContainer__body--sameAs"]}>
							<div className={styles.elementContainer__subBody}>
								<div className={styles.inputContainer}>
									<DateTimePicker
										ampm
										inputFormat="DD/MM/YYYY hh:mm a"
										label="Event start date and time"
										renderInput={(params) => <TextField fullWidth {...params} />}
										value={eventStartDateDisplay}
										onChange={handleEventStartDate}
									/>
								</div>
								<div className={styles.inputContainer}>
									<DateTimePicker
										ampm
										inputFormat="DD/MM/YYYY hh:mm a"
										label="Event end date and time"
										renderInput={(params) => <TextField fullWidth {...params} />}
										value={eventEndDateDisplay}
										onChange={handleEventEndDate}
									/>
								</div>
								<div className={styles.inputContainer}>
									<TextField
										fullWidth
										id="outlined-basic"
										label="URI of event resource"
										value={eventSameAsURI}
										variant="outlined"
										onChange={handleEventSameAsURI}
									/>
								</div>
							</div>
							<Button className={styles.executeButton} variant="contained" onClick={handleExecuteSameAs}>
								Execute
							</Button>
						</div>
					</ThemeProvider>
				</div>
			</div>
			<div className={styles.receivedData}>
				{Array.isArray(responseDisplay) && responseDisplay.length > 0
					? responseDisplay.map((res) => (
							<a key={res} className={styles.resultsURI} href={res} rel="noreferrer" target="_blank">
								{res}
							</a>
					  ))
					: "Received data will be displayed here"}
			</div>
		</div>
	);
}

export default Main;
