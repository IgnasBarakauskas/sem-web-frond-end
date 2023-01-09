import { createTheme } from "@material-ui/core/styles";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
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
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		const date = new Date();
		setYear(date.getFullYear().toString());
		let tempMonth = date.getMonth();
		tempMonth = (tempMonth + 1).toString();
		setMonth(tempMonth.length > 1 ? tempMonth : `0${tempMonth}`);
		setDay(date.getDate().toString().length > 1 ? date.getDate().toString : `0${date.getDate()}`);
	}, []);

	const theme = createTheme({
		palette: {
			type: "dark",
		},
	});
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
		enqueueSnackbar("Download has started", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}download`, downloadUrl)
			.then(() => {
				enqueueSnackbar("Download was successfull", {
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
		enqueueSnackbar("Reading has started", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.get(`${url}read`)
			.then(() => {
				enqueueSnackbar("Reading was successfull", {
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
		enqueueSnackbar("Scrape has started", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}extract`, cityName)
			.then(() => {
				enqueueSnackbar("Scrape was successfull", {
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
		enqueueSnackbar("User addition has started", {
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
	const handleExecuteGetCourses = () => {
		setResponseDisplay("");
		enqueueSnackbar("SPARQL query started to receive events", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}get-events`, { year, month, day })
			.then((res) => {
				setResponseDisplay(res.data.results.bindings);
				if (res.data.results.bindings.length > 0) {
					enqueueSnackbar("Events were received", {
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
				enqueueSnackbar("Error occured while receiving events", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	const handleExecuteGetEvents = () => {
		setResponseDisplay("");
		enqueueSnackbar("SPARQL query started to receive events", {
			variant: "info",
			anchorOrigin: { horizontal: "right", vertical: "top" },
		});
		axios
			.post(`${url}get-non-course-events`)
			.then((res) => {
				setResponseDisplay(res.data.results.bindings);
				if (res.data.results.bindings.length > 0) {
					enqueueSnackbar("Events were received", {
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
				enqueueSnackbar("Error occured while receiving events", {
					variant: "error",
					anchorOrigin: { horizontal: "right", vertical: "top" },
				});
			});
	};
	return (
		<div className={styles.body}>
			<div className={styles.blockElementsContainer}>
				<div className={`${styles.elementContainer} ${styles.elementContainer__send}`}>
					<div className={styles.elementContainer__title}>Download file. Create and upload rdf</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="URL from where file should be downloaded"
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
					<div className={styles.elementContainer__title}>Read file. Create and upload rdf</div>
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
					<div className={styles.elementContainer__title}>Extract events by city name</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="City name from which events should be scraped"
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
									label="URL of attendee rdf"
									value={attendeeURI}
									variant="outlined"
									onChange={handleAttendeeURI}
								/>
							</div>
							<div className={styles.inputContainer}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="URL of event rdf"
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
					<div className={styles.elementContainer__title}>Get events of specific date</div>
					<div className={styles.divider} />
					<ThemeProvider theme={theme}>
						<div className={styles.elementContainer__body}>
							<div className={styles.inputContainer}>
								<DesktopDatePicker
									inputFormat="DD/MM/YYYY"
									label="Enter date for which you are searching events"
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
					<div className={styles.elementContainer__title}>Get all non course events</div>
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
			</div>
			<div className={styles.receivedData}>
				{Array.isArray(responseDisplay) && responseDisplay.length > 0
					? responseDisplay.map((res) => (
							<a
								key={res.sub.value}
								className={styles.resultsURI}
								href={res.sub.value}
								rel="noreferrer"
								target="_blank"
							>
								{res.sub.value}
							</a>
					  ))
					: "Received data will be displayed here"}
			</div>
		</div>
	);
}

export default Main;
