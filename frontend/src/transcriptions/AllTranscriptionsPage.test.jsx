import React from "react";
import { render, screen } from "@testing-library/react";
import { AllTranscriptionsPage } from "./AllTranscriptionsPage.jsx";
import { useTranscriptions } from "./hooks/useTranscriptions.jsx";

// Mock the custom hook
jest.mock("./hooks/useTranscriptions.jsx");

describe("AllTranscriptionsPage", () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks to ensure test isolation
    });

    test("renders loading state when data is loading", () => {
        // Mock the hook's return value
        useTranscriptions.mockReturnValue({
            transcriptions: [],
            loading: true,
            error: null,
        });

        // Render the component
        render(<AllTranscriptionsPage />);

        // Check that the loading text is displayed
        expect(screen.getByText("Loading transcriptions...")).toBeInTheDocument();
    });

    test("renders error message when an error occurs", () => {
        // Mock the hook's return value
        useTranscriptions.mockReturnValue({
            transcriptions: [],
            loading: false,
            error: "Failed to fetch transcriptions",
        });

        // Render the component
        render(<AllTranscriptionsPage />);

        // Check that the error message is displayed
        expect(screen.getByText("Error: Failed to fetch transcriptions")).toBeInTheDocument();
    });

    test("renders transcriptions when available", () => {
        // Mock the hook's return value with available transcriptions
        useTranscriptions.mockReturnValue({
            transcriptions: [
                { filename: "file 1.mp3", transcription: "First transcription" },
                { filename: "file 2.mp3" , transcription: "Second transcription" },
            ],
            loading: false,
            error: null,
        });

        // Render the component
        render(<AllTranscriptionsPage />);

        // Check that the transcriptions are displayed correctly
        expect(screen.getByText("First transcription")).toBeInTheDocument();
        expect(screen.getByText("Second transcription")).toBeInTheDocument();
    });
});