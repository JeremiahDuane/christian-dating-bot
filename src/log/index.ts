import fs from "fs";
import sys from "./log.json";
import { EventMessage } from "@/classes/EventMessage";

function log(text: string | EventMessage, error?: any): void {
  const stringMessage = typeof text === "string" ? text : text.toString();
  if (error) {
    console.error(stringMessage, error);
  } else {
    console.log(stringMessage);
  }
  const logFilePath = "logs.txt";
  const timestamp = new Date().toISOString();
  const prefix = error ? "ERROR: " : "";

  // Create log message with timestamp and prefix
  const logMessage = `[${timestamp}] ${prefix}${stringMessage}${
    error ? "\n\t" + error : ""
  }\n`;

  // Append log message to the log file
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error("[@log bot] Error writing to log file:", err);
    }
  });
}

export { log, sys };
