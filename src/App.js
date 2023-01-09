import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SnackbarProvider } from "notistack";
import React from "react";
import "./App.css";
import Main from "./views/main/Main";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<SnackbarProvider maxSnack={3}>
				<Main />
			</SnackbarProvider>
		</LocalizationProvider>
	);
}

export default App;
